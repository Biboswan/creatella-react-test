import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { HomePageContext } from "../../Context";

const useStyles = makeStyles(theme => ({
  pageTitleBar: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    height: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const PageTitleBar = () => {
  const classes = useStyles();
  const { title } = useContext(HomePageContext);
  return (
    <div className={classes.pageTitleBar}>
      <Typography variant="h3">{title}</Typography>
    </div>
  );
};

export default PageTitleBar;
