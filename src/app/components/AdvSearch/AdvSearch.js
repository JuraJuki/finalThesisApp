import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./AdvSearch.scss";

import ImgBg from "../ImgBg/ImgBg";

const getSearchUrl = searchString => {
  return searchString ?
  `/api/images/search/${searchString}`:
  `/api/images/search/ ?type=newest`;
}

class AdvSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: props.value || ""
    };

    this.searchHandler();
  }

  changeHandler = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  searchHandler = e => {
    e && e.preventDefault();

    const searchUrl = getSearchUrl(this.state.searchString);
    fetch(searchUrl)
      .then(x => x.json())
      .then(x => {
        this.props.saveSearchResults({
          results: x
        });
        console.log(this.state);
      })
      .catch(err => {
       console.log(err);
      });
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.advSearch}>
          <div>
            <form className={classes.searchDiv} onSubmit={this.searchHandler}>
              <input
                onChange={this.changeHandler}
                className={classes.input}
                type="text"
                placeholder="Search Wallpapers.."
                value={this.state.searchString}
              />
              <input type="submit"  />
              <br />
            </form>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default AdvSearch;
