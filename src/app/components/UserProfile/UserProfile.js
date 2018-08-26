import React, { Component } from "react";
import { connect } from "react-redux";
import withToken from "../hoc/withToken";
import classes from "./UserProfile.scss";

import UserWallpapers from "./UserWallpapers/UserWallpapers";
import * as actions from "../state/actions/userProfileActions";
import PublicProfile from "../PublicProfile/PublicProfile";

class UserProfile extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.initImages();
    const userInfo = await this.props.getUserInfo();
    this.setState(userInfo);
  }
  render() {
    return (
      <div className={classes.all}>
        <PublicProfile
          avatar={this.state.avatar}
          token={this.props.token}
          username={this.state.username}
          uploads={this.state.uploads}
          totalViews={this.state.totalViews}
          uploadLikes={this.state.uploadLikes}
          totalLikes={this.state.totalLikes}
          totalFavorites={this.state.totalFavorites}
        />
        <div className={classes.wrapperProfile}>
          <div className={classes.firstColumn} />
          <div className={classes.images}>
            <UserWallpapers images={this.props.images} removeImage={this.props.removeImage}/>
          </div>
          <div className={classes.lastColumn} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userProfileReducer } = state;
  return { images: userProfileReducer.images };
};

const mapDispatchToProps = dispatch => {
  return {
    initImages: () => dispatch(actions.initImages()),
    removeImage: (imgId) => dispatch(actions.removeImage(imgId))
  };
};

export default withToken(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserProfile)
);
