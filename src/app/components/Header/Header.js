import React, { Component } from "react";
import classes from "./Header.scss";

import User from "./User/User";
import LogoSmall from "../Logo/LogoSmall";

class Header extends Component {
  render() {
    return (
      <div className={classes.header}>
        <div className={classes.box1}>
          <LogoSmall/>
        </div>
        <div className={classes.box3}>
          <User />
        </div>
      </div>
    );
  }
}

export default Header;
