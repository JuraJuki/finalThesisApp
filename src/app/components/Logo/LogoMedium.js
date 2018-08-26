import React from "react";
import classes from "./LogoSmall.scss";

import { Link } from "react-router-dom";
import logoMedium from "../../img/logoMedium.jpg";

const LogoMedium = () => (
  <Link to="/">
    <img src={logoMedium} alt="LogoMedium" />
  </Link>
);

export default LogoMedium;
