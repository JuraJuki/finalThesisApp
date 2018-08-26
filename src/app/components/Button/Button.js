import React from 'react';
import classes from "./Button.scss";

const Button = (props) => (
    <input type="submit" className={[classes.button, classes[props.bg]].join(" ")} onClick={props.onClick} value={props.children}/>
);

export default Button;
