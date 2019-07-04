import React from "react";
import DateAdded from "../DateAdded";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0 0 15px 15px"
  }
}));

const ProductDetails = props => {
  const { size, price, date } = props;
  const classes = useStyles();
  return (
    <Grid
      classes={{ root: classes.root }}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Typography>
        Size: {size} <br />
        Price: ${price / 100} <br /> Added:
        <DateAdded from={date} />
      </Typography>
    </Grid>
  );
};

export default ProductDetails;
