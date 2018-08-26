import React from "react";
import classes from "./Logo.scss";

import { Link } from "react-router-dom";
import logo from "../../../server/public/static/logo.png";

const Logo = () => (
  <div className={classes.logo}>
    <Link to="/" >
      <img src={logo} alt="Logo" />
    </Link>
  </div>
);

export default Logo;
