import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  root: {
    width: 320,
    height: 239.533
  }
}));

const RandomAdvertisement = () => {
  const url = `${process.env.REACT_APP_SERVER}/ads/?r=${Math.floor(
    Math.random() * 1000
  )}`;
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <p>But first, a word from our sponsors:</p>
      <img className="ad" src={url} alt="adversitement from sponsor" />
    </div>
  );
};

export default RandomAdvertisement;
