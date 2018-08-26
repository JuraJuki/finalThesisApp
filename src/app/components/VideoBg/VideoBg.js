import React from "react";
import classes from "./VideoBg.scss";


const VideoBg = () => (
  <div className={classes.bgVidDiv}>
    <video className={classes.bgVid} autoPlay muted loop>
      <source src="/static/bgVid.mp4" type="video/mp4" />
    </video>
  </div>
);

export default VideoBg;
