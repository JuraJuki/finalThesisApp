import React from "react";

import { Link } from "react-router-dom";
import classes from "./LogoSmall.scss";

const LogoSmall = () => (
  <Link to="/">
    <img className={classes.logoSmall} src="/static/logoSmall.png" alt="LogoSmall" />
  </Link>
);

export default LogoSmall;
