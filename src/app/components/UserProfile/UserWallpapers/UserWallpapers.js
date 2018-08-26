import React, { Component } from "react";
import classes from "./UserWallpapers.scss";

import Wallpaper from "./Wallpaper/Wallpaper";

class Wallpapers extends Component {
  //promjenit Ime
  state={
    isPublicProfile:null,
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const isPublicProfile = window.location.href.split("/")[3];
    if (isPublicProfile == "public_profile") {
      this.setState({ isPublicProfile: true });
    }
  }

  render() {
    const wallpapers = this.props.images.map(image => (
      <Wallpaper
        key={image.id}
        id={image.id}
        path={image.path}
        removeImage={this.props.removeImage}
        isPublicProfile={this.state.isPublicProfile}
      />
    ));
    return <div className={classes.pictures}>{wallpapers}</div>;
  }
}

export default Wallpapers;
