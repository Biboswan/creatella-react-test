import React, { useEffect } from "react";
import ProductDetails from "../ProductDetails";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "300px"
  },
  face: props => ({
    fontSize: props.faceSize,
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  })
}));

const Product = props => {
  const { face, size, price, date } = props.data;
  const classes = useStyles({ faceSize: size });
  return (
    <div className={classes.root}>
      <div className={classes.face}>{face}</div>
      <ProductDetails size={size} price={price} date={date} l={face.length} />
    </div>
  );
};

export default Product;
