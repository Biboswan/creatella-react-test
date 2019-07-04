import React from "react";

const RandomAdvertisement = () => {
  const url = `${process.env.REACT_APP_SERVER}/ads/?r=${Math.floor(
    Math.random() * 1000
  )}`;
  return (
    <div>
      <p>But first, a word from our sponsors:</p>
      <img className="ad" src={url} alt="adversitement from sponsor" />
    </div>
  );
};

export default RandomAdvertisement;
