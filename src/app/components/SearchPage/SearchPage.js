import React, { Component } from "react";

import classes from "./SearchPage.scss";

import LogoSmall from "../Logo/LogoSmall";
import AdvSearch from "../AdvSearch/AdvSearch";
import Button from "../Button/Button";
import User from "../Header/User/User";
import SearchResults from "../SearchResults/SearchResults";

class SearchPage extends Component {
  state = {};

  componentDidMount() {
    const searchType = this.getUrlParams("searchType") || "newest";

    if (!this.getUrlParams("v"))
      this.searchTypeClick({ target: { value: searchType } });
  }

  saveSearchResults = result => {
    this.setState(result);
  };

  getSearchResults = () => {
    return this.state;
  };

  getUrlParams = name => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(name);
  };

  searchTypeClick = e => {
    fetch(`/api/images/search/?type=${e.target.value}`)
      .then(x => x.json())
      .then(x => {
        this.saveSearchResults({
          results: x
        });
        console.log(this.state);
      });
  };

  render() {
    const searchValue = this.getUrlParams("v");

    return (
      <div className={classes.wrapper}>
        <div className={classes.searchPageDiv}>
          <div className={classes.divLogo}>
            <LogoSmall />
          </div>
          <div className={classes.centered}>
            <AdvSearch
              saveSearchResults={this.saveSearchResults}
              getSearchType={this.getUrlParams("searchType")}
              value={searchValue}
            >
              <div className={classes.searchButtons}>
                <Button bg="blue" onClick={this.searchTypeClick}>
                  Newest
                </Button>
                <Button bg="blue" onClick={this.searchTypeClick}>
                  Top
                </Button>
                <Button bg="blue" onClick={this.searchTypeClick}>
                  Random
                </Button>
                <Button bg="blue" onClick={this.searchTypeClick}>
                  Most views
                </Button>
                <Button bg="blue" onClick={this.searchTypeClick}>
                  Most favorites
                </Button>
              </div>
            </AdvSearch>
          </div>
          <div className={classes.divUser}>
            <User />
          </div>
        </div>
        <div className={classes.result}>
          {this.state.results && (
            <SearchResults results={this.getSearchResults().results} />
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
