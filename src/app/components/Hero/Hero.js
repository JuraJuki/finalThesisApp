import React from "react";
import classes from "./Hero.scss";

import Search from "./Search/Search";
import searchClasses from "./Search/Search.scss";
import Navigation from "../Header/Navigation/Navigation";

const Hero = () => (
  <div className={classes.hero}>
    <div className={classes.title}>
      <h1>WallGazer</h1>
      <h2>Home of eye soothing wallpapers</h2>
    </div>
    <div className={classes.searchButtonDiv}>
      <Search className={searchClasses.centered} />
      <Navigation />
    </div>
  </div>
);

export default Hero;
