import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { HomePageContext } from "../../Context";

const useStyles = makeStyles(theme => ({
  pageBanner: {}
}));

const PageBanner = () => {
  const classes = useStyles();
  const { banner } = useContext(HomePageContext);
  return (
    <Typography variant="h6" className={classes.pageBanner}>
      {banner}
    </Typography>
  );
};

export default PageBanner;
