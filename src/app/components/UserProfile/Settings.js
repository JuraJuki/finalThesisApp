import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Settings.scss";

import User from "../Header/User/User";
import LogoSmall from "../Logo/LogoSmall";
import withToken from "../hoc/withToken";
import defaultUserPng from "../../../server/public/defaultUser.png";

class Settings extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const userInfo = await this.props.getUserInfo();
    this.setState(userInfo);
  }

  updateProfilePicture = e => {
    e.preventDefault();
    const image = Array.from(e.target.children).filter(
      el => el.type == "file"
    )[0];
    const avatarImageName = image.files[0].name.split(".")[0];
    const formData = new FormData();
    formData.append("name", avatarImageName);
    formData.append("image", image.files[0]);
    fetch("/api/users/avatar", {
      method: "post",
      headers: {
        Authorization: `Bearer ${this.props.token}`
      },
      body: formData
    }).then(_ => {
      this.setState(
        Object.assign({}, this.state, { avatar: `/${image.files[0].name}` })
      );
    });
  };

  deleteAccountHandler = e => {
    e.preventDefault();
    if (confirm("Are you sure? This action is irreversible")) {
      fetch("/api/users", {
        method: "delete",
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      }).then(_ => {
        delete localStorage.token;
        this.props.history.push("/");
      });
    } else {
    }
  };

  render() {
    return (
      <div className={classes.all}>
        <div className={classes.header}>
          <LogoSmall />
          <User avatar={this.state.avatar}>
            <Link className={classes.searchPageButton} to="/searchpage">
              Search
            </Link>
          </User>
        </div>
        <div className={classes.settings}>
          <div className={classes.profilePictureDiv}>
            <h2>Change profile picture</h2>
            <img
              className={classes.profilePicture}
              src={this.state.avatar || defaultUserPng}
              alt="profilePicture"
              width="200"
              height="200"
            />

            <form action="" onSubmit={this.updateProfilePicture}>
              <input type="file" />
              <p className={classes.pictureSize}>The picture must be in 1:1 pixel ratio</p>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className={classes.otherSettings}>
            <div className={classes.deleteAccount}>
              <h2>Delete account</h2>
              <form action="" onSubmit={this.deleteAccountHandler}>
                <input type="submit" value="Delete Account" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToken(Settings);
