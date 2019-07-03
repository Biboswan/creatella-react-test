import React from "react";
import { makeStyles } from "@material-ui/styles";
import dayDifference from "../../utils/dayDifference";
import { fontSize } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: props => ({
    width: "200px",
    fontSize: props.size
  })
}));

const Product = props => {
  const { data } = props;
  const classes = useStyles(data);
  let st = "";
  const dayDiff = dayDifference(data.date);
  console.log(dayDiff);
  for (let i = 0; i < data.face.length; i++) {
    st = st + "m " + data.face[i];
  }
  return (
    <div className={classes.root}>
      <div>{data.face}</div>
      <p style={{ fontSize: "14px" }}>
        Size: {data.size} <br />
        Price: ${data.price / 100} <br /> Added:
        {dayDiff <= 7 ? `${dayDiff} days ago` : data.date}
      </p>
    </div>
  );
};

export default Product;
