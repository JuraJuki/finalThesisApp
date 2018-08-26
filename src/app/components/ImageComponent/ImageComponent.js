import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import classes from "./ImageComponent.scss";

import Search from "../Hero/Search/Search";
import User from "../Header/User/User";
import LogoSmall from "../Logo/LogoSmall";

class ImageComponent extends Component {
  state = {
    imageInfo: {},
    user: {},
    sidebar: false
  };
  constructor(props) {
    super(props);
    fetch("/api/images/updateViews/" + props.match.params.imgId, {
      method: "PUT"
    });
  }

  componentDidMount() {
    const token = localStorage.token;
    const fetchOpts = {};

    if (token)
      Object.assign(fetchOpts, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

    fetch("/api/images/single/" + this.props.match.params.imgId, fetchOpts)
      .then(x => x.json())
      .then(x => {
        console.log(x);
        this.setState(x);
      });
  }

  likeHandler = () => {
    fetch("/api/images/like/" + this.props.match.params.imgId, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.token
      }
    }).then(_ => {
      const newState = Object.assign({}, this.state);
      newState.imageInfo.isLiked = !newState.imageInfo.isLiked;
      if (newState.imageInfo.isLiked) newState.imageInfo.likes++;
      else newState.imageInfo.likes--;
      this.setState(newState);
    });
  };

  favoriteHandler = () => {
    fetch("/api/images/favorite/" + this.props.match.params.imgId, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.token
      }
    }).then(_ => {
      const newState = Object.assign({}, this.state);
      newState.imageInfo.isFavorite = !newState.imageInfo.isFavorite;
      if (newState.imageInfo.isFavorite) newState.imageInfo.favorites++;
      else newState.imageInfo.favorites--;
      this.setState(newState);
    });
  };

  generateButton = (condition, inactiveText, activeText, inactiveHandler) => {
    return condition() ? (
      <button onClick={inactiveHandler} disabled={!localStorage.token}>
        {inactiveText}
      </button>
    ) : (
      <button onClick={inactiveHandler} disabled={!localStorage.token}>
        {activeText}
      </button>
    );
  };

  toggleSidebar = () => {
    if (this.state.sidebar) this.setState({ sidebar: false });
    else {
      this.setState({ sidebar: true });
    }
  };

  render() {
    const like = this.generateButton(
      () => !this.state.imageInfo.isLiked,
      "Like",
      "Unlike",
      this.likeHandler
    );
    const favorite = this.generateButton(
      () => !this.state.imageInfo.isFavorite,
      "Favorite",
      "Unfavorite",
      this.favoriteHandler
    );

    return (
      <div className={classes.wrapper}>
        <div
          className={[
            classes.sidebar,
            this.state.sidebar ? classes.showSidebar : ""
          ].join(" ")}
        >
          <LogoSmall />
          <hr className={classes.hr} />
          <div className={classes.innerUser}>
            <User />
          </div>
          <div className={classes.innerSearch}>
            <Search />
          </div>
          <hr className={classes.hr} />
          <div className={classes.description}>
            <h3>{this.state.imageInfo.name}</h3>
            <p>
              {" "}
              Uploader:{" "}
              <Link to={`/public_profile/${this.state.user.id}`}>
                {this.state.user.username}
              </Link>
            </p>
            <p>{this.state.imageInfo.description}</p>
            <p>Views: {this.state.imageInfo.views}</p>
            <p>Likes: {this.state.imageInfo.likes}</p>
            <p>Favorites: {this.state.imageInfo.favorites}</p>
          </div>
          <hr className={classes.hr} />
          <div className={classes.interaction}>
            {like}
            {favorite}
          </div>
          <button
            className={[
              classes.sidebarToggle,
              this.state.sidebar ? classes.sidebarButtonRotate : ""
            ].join(" ")}
            onClick={this.toggleSidebar}
          >
            &gt;
          </button>
        </div>
        <div className={classes.bottom}>b</div>
        <div className={classes.imageDiv}>
          <img
            className={classes.image}
            src={`${this.state.imageInfo.path}`}
            alt="img"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ImageComponent);
