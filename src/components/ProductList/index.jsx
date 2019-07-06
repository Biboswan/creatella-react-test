import React, { useState, useEffect, useContext } from "react";
import Product from "../Product";
import RandomAdvertisement from "../RandomAdvertisement";
import Spinner from "../Spinner";
import { SortByContext } from "../../Context";
import { makeStyles, Typography } from "@material-ui/core";

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
let baseApiUrl = `${process.env.REACT_APP_SERVER}/api/products`;
let productObserver;

const ProductList = () => {
  const classes = useStyle();
  const { sortBy } = useContext(SortByContext);
  const [products, setProducts] = useState([]);

  //Indicates the new products will be addded to the list
  const [isLoading, setIsLoading] = useState(false);

  const [isCatalogEnd, setIsCatalogEnd] = useState(false);

  //callback for the product observer
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let page = Math.ceil(products.length / pageLimit);
        observer.unobserve(entry.target);
        let query = `?_page=${page + 1}&_limit=${pageLimit}`;
        if (sortBy !== "None") {
          query += `&_sort=${sortBy.toLowerCase()}`;
        }
        const value = sessionStorage.getItem(query);
        if (!value) {
          fetch(baseApiUrl + query)
            .then(res => res.json())
            .then(data => {
              setIsLoading(true);
              if (data.length === 0) {
                setIsCatalogEnd(true);
              } else {
                const modifiedProducts = [...products, ...data];
                setProducts(modifiedProducts);
                sessionStorage.setItem(query, JSON.stringify(modifiedProducts));
              }
            });
        } else {
          setProducts(products => [...products, ...JSON.parse(value)]);
        }
      }
    });
  };

  /**
   * Whenever the sort type changes we gotta start fetching products from page 1
   */
  useEffect(() => {
    let query = `?_page=1&_limit=${pageLimit}`;
    if (sortBy !== "None") {
      query += `&_sort=${sortBy.toLowerCase()}`;
    }
    const value = sessionStorage.getItem(query);
    if (!value) {
      setIsLoading(true);
      fetch(baseApiUrl + query)
        .then(res => res.json())
        .then(data => {
          setIsLoading(false);
          setProducts(data);
          sessionStorage.setItem(query, JSON.stringify(data));
        });
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
          fetch(baseApiUrl + query)
            .then(res => res.json())
            .then(data => {
              if (data.length === 0) {
                setIsCatalogEnd(true);
              } else {
                sessionStorage.setItem(query, JSON.stringify(data));
              }
            });
        }
      });
    }
  }, [products]);

  useEffect(() => {
    if (products.length) {
      let page = Math.ceil(products.length / pageLimit);
      if ("IntersectionObserver" in window) {
        const options = { root: null };
        //rootMargin: "0px 0px 200px 0px"
        productObserver = new IntersectionObserver(callback, options);
        let n = pageLimit * page - 1;
        let target = document.querySelector(`#product-${n}`);
        console.log(n);
        //console.log(target.innerText);
        productObserver.observe(target);
      }
    }
  }, [products]);

  return (
    <div>
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
    </div>
  );
};

export default ProductList;
