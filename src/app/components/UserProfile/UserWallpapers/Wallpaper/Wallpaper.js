import React from "react";
import classes from "./Wallpaper.scss";
import { Link } from "react-router-dom";

const Wallpaper = props => (
  <li className={classes.li}>
    <button className={classes.deleteImage}
      disabled={props.isPublicProfile}
      onClick={() => {
        props.removeImage(props.id);
      }}
    >
      Delete
    </button>
    <Link to={"/Img/" + props.id}>
      <img className={classes.img} src={props.path} />
    </Link>
  </li>
);

export default Wallpaper;
