import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import Product from "../Product";
import RandomAdvertisement from "../RandomAdvertisement";
import Spinner from "../Spinner";
import { SortByContext } from "../../Context";

const useStyle = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flexWrap: "wrap",
    listStyle: "none",
    width: "100%",
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-around"
    }
  }
}));

const pageLimit = 15;
const baseApiUrl = `${process.env.REACT_APP_SERVER}/api/products`;
let productObserver;

const ProductList = () => {
  const classes = useStyle();
  const { sortBy } = useContext(SortByContext);
  const [products, setProducts] = useState([]);

  //Indicates the new products will be addded to the list
  const [isLoading, setIsLoading] = useState(false);

  const [isCatalogEnd, setIsCatalogEnd] = useState(false);

  /**
   * Whenever the sort type changes we gotta start fetching products from page 1
   */
  useEffect(() => {
    //TODO: Use memoization to calculate query
    let query = `?_page=1&_limit=${pageLimit}`;
    if (sortBy !== "None") {
      query += `&_sort=${sortBy.toLowerCase()}`;
    }
    const value = sessionStorage.getItem(query);

    if (!value) {
      const fetchProducts = async () => {
        const res = await fetch(baseApiUrl + query);
        const data = await res.json();
        setIsLoading(false);
        setProducts(data);
        sessionStorage.setItem(query, JSON.stringify(data));
      };
      setIsLoading(true);
      fetchProducts();
    } else {
      setProducts(JSON.parse(value));
    }
  }, [sortBy]);

  /**
   * pre-emptively fetch the next batch of results in advance in the sessions storage,
   * making use of idle-time. But they still should not be displayed.
   */
  useEffect(() => {
    if (products.length && !isCatalogEnd) {
      requestIdleCallback(() => {
        let page = Math.ceil(products.length / pageLimit);
        let query = `?_page=${page + 1}&_limit=${pageLimit}`;
        if (sortBy !== "None") {
          query += `&_sort=${sortBy.toLowerCase()}`;
        }
        if (!sessionStorage.getItem(query)) {
          const fetchProducts = async () => {
            const res = await fetch(baseApiUrl + query);
            const data = await res.json();
            if (data.length === 0) {
              setIsCatalogEnd(true);
            } else {
              sessionStorage.setItem(query, JSON.stringify(data));
            }
          };
          fetchProducts();
        }
      });
    }
  }, [products]);

  /**
   * Whenever products state is updated observe the last product
   */
  useEffect(() => {
    //callback for the product observer
    const productObserverCallback = (entries, observer) => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          let page = Math.ceil(products.length / pageLimit);
          let query = `?_page=${page + 1}&_limit=${pageLimit}`;
          if (sortBy !== "None") {
            query += `&_sort=${sortBy.toLowerCase()}`;
          }
          const value = sessionStorage.getItem(query);
          if (!value) {
            const res = await fetch(baseApiUrl + query);
            const data = await res.json();
            setIsLoading(true);
            if (data.length === 0) {
              setIsCatalogEnd(true);
            } else {
              const modifiedProducts = [...products, ...data];
              setProducts(modifiedProducts);
              sessionStorage.setItem(query, JSON.stringify(modifiedProducts));
            }
          } else {
            setProducts(products => [...products, ...JSON.parse(value)]);
          }
        }
      });
    };

    if (products.length && !isCatalogEnd && "IntersectionObserver" in window) {
      let page = Math.ceil(products.length / pageLimit);
      const options = { root: null };
      productObserver = new IntersectionObserver(
        productObserverCallback,
        options
      );
      let n = pageLimit * page - 1;
      let target = document.querySelector(`#product-${n}`);
      productObserver.observe(target);
    }
  }, [products]);

  return (
    <Grid container direction="column" alignItems="center">
      {products.length === 0 && isLoading && <Spinner />}
      <ul className={classes.root} id="product-list">
        {products.map((product, i) => (
          <>
            <li id={`product-${i}`} key={i}>
              <Product data={product} />
            </li>
            {(i + 1) % 20 === 0 && (
              <li key={`ad${i}`}>
                <RandomAdvertisement />
              </li>
            )}
          </>
        ))}
      </ul>
      {products.length && isLoading && <Spinner />}
      {isCatalogEnd && <Typography>~ end of catalogue ~</Typography>}
    </Grid>
  );
};

export default ProductList;
