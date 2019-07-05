import React, { useState, useEffect, useContext } from "react";
import Product from "../Product";
import RandomAdvertisement from "../RandomAdvertisement";
import { SortByContext } from "../../Context";
import { makeStyles } from "@material-ui/core";

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

const ProductList = () => {
  const classes = useStyle();
  const { sortBy } = useContext(SortByContext);
  const [products, setProducts] = useState([]);

  //Product load is paginated. page holds the no. of pages for which data has been fetched
  const [page, setPage] = useState(0);

  useEffect(() => {
    let query = `?_page=1&_limit=${pageLimit}`;
    if (sortBy !== "None") {
      query += `&_sort=${sortBy.toLowerCase()}`;
    }
    const value = sessionStorage.getItem(query);
    if (!value) {
      fetch(baseApiUrl + query)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setPage(page => page + 1);
          sessionStorage.setItem(query, JSON.stringify(data));
        });
    } else {
      setProducts(JSON.parse(value));
    }
  }, [sortBy]);

  useEffect(() => {
    requestIdleCallback(() => {
      let query = `?_page=${page + 1}&_limit=${pageLimit}`;
      if (sortBy !== "None") {
        query += `&_sort=${sortBy.toLowerCase()}`;
      }
      if (!sessionStorage.getItem(query)) {
        fetch(baseApiUrl + query)
          .then(res => res.json())
          .then(data => {
            sessionStorage.setItem(query, JSON.stringify(data));
          });
      }
    });
  }, [page]);

  return (
    <ul className={classes.root}>
      {products.map((product, i) => (
        <>
          <li key={i}>
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
  );
};

export default ProductList;
