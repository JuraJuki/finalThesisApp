import React from "react";
import classes from "./ImgBg.scss";
import bgImg from "../../../server/public/static/formBg.jpg";

const ImgBg = () => (
  <div className={classes.bgImgDiv}>
    <img className={classes.bgImg} src={bgImg}/>
  </div>
);

export default ImgBg;
