import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./User.scss";

import withToken from "../../hoc/withToken";
import defaultUserPng from "../../../../server/public/defaultUser.png";

const emptyState = {};

class User extends Component {
  logout = () => {
    localStorage.clear();
    this.setState({ tokenExist: null });
  };

  constructor(props) {
    super(props);
    this.state = {
      tokenExist: props.token,
      userInfo: null
    };
  }

  async componentDidMount() {
    const userInfo = await this.props.getUserInfo();
    this.setState({ userInfo });
  }

  async componentDidUpdate() {
    if (this.props.avatar && this.props.avatar != this.state.userInfo.avatar) {
      const { userInfo } = this.state;
      userInfo.avatar = this.props.avatar;
      this.setState({ userInfo });
    }
  }

  render() {
    if (this.state.tokenExist && this.state.userInfo) {
      return (
        <div className={classes.wrapper}>
          <div className={classes.userInfo}>
            <Link className={classes.linkProfile} to={`/profile`}>
              <img
                className={classes.profilePicture}
                src={this.state.userInfo.avatar || defaultUserPng}
                alt="profilePicture"
                width="44"
                height="44"
              />
            </Link>
            <p className={classes.username}>{this.state.userInfo.username}</p>
          </div>

          <div className={classes.userButtons}>
            {this.props.children}
            <Link className={classes.link} to="/Upload">
              Upload
            </Link>
            <Link className={classes.link} to="/" onClick={this.logout}>
              Logout
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.notLoggedIn}>
        <Link className={classes.link} to="/Login">
          Log in
        </Link>
        <Link className={classes.link} to="/Signup">
          Sign up
        </Link>
      </div>
    );
  }
}

export default withToken(User);
