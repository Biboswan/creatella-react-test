import React, { useState, useEffect, useContext } from "react";
import { SortByContext } from "../../Context";

const ProductList = () => {
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
    <ul>
      {products.map((product, i) => {
        return <li key={i}>{product.face}</li>;
      })}
    </ul>
  );
};

export default ProductList;
