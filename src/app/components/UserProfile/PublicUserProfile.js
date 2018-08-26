import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import classes from "./PublicUserProfile.scss";

import UserWallpapers from "./UserWallpapers/UserWallpapers";
import * as actions from "../state/actions/userProfileActions";
import PublicProfile from "../PublicProfile/PublicProfile";

class PublicUserProfile extends Component {
  state = {
    userInfo: {},
    images: []
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetch(`/api/users/${this.props.match.params.id}`, {
      method: "GET"
    })
      .then(x => x.json())
      .then(x => {
        this.setState(x);
      });
  }
  render() {
    const { images, userInfo } = this.state;

    return (
      <div className={classes.all}>
        <PublicProfile
          username={userInfo.username}
          uploads={userInfo.uploads}
          totalViews={userInfo.totalViews}
          uploadLikes={userInfo.uploadLikes}
          totalLikes={userInfo.totalLikes}
          totalFavorites={userInfo.totalFavorites}
          avatar={userInfo.avatar}
        >
          <div className={classes.wrapperProfile}>
            <div className={classes.firstColumn} />
            <div className={classes.images}>
              <UserWallpapers images={images} />
            </div>
            <div className={classes.lastColumn} />
          </div>
        </PublicProfile>
      </div>
    );
  }
}
export default withRouter(PublicUserProfile);
