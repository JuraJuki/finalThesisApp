import React, { Component } from "react";
import classes from "./SearchResults.scss";

import { Link } from "react-router-dom";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    let { results } = this.props;

    let images = results.map((x, i) => {
      let rendered = (
        <Link to={`/Img/${x.id}`} key={i}>
          <img src={x.path} alt="img2" width="400px" />
        </Link>
      );
      return rendered;
    });

    return (
      <div className={classes.wrapper}>
        <div className={classes.firstColumn}>f</div>
        <div className={classes.imagesDiv}>{images}</div>
        <div className={classes.lastColumn}>l</div>
      </div>
    );
  }
}

export default SearchResults;
