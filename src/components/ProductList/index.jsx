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

const ProductList = () => {
  const classes = useStyle();
  const { sortBy } = useContext(SortByContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url = `${process.env.REACT_APP_SERVER}/api/products`;
    if (sortBy !== "None") {
      url += `?_sort=${sortBy.toLowerCase()}`;
      console.log(url);
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  }, [sortBy]);

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
