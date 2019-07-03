import React, { useEffect, useState } from "react";
import { HomePageContext, SortByContext } from "../../Context";
import Header from "../../components/Header";
import SortOption from "../../components/SortOption";
import ProductList from "../../components/ProductList";

const pageDetails = {
  title: "Products Grid",
  banner: `Here you're sure to find a bargain on some of the finest ascii available 
      to purchase. Be sure to peruse our selection of ascii faces in an exciting
      range of sizes and prices.`
};

const Home = () => {
  const [sortBy, setSortBy] = useState("None");
  useEffect(() => (document.title = pageDetails.title), []);
  return (
    <HomePageContext.Provider value={pageDetails}>
      <Header />
      <SortByContext.Provider value={{ sortBy, setSortBy }}>
        <main>
          <SortOption />
          <ProductList />
        </main>
      </SortByContext.Provider>
    </HomePageContext.Provider>
  );
};

export default Home;
