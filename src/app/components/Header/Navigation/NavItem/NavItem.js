import React from 'react';
import classes from "./NavItem.scss";
import { Link } from 'react-router-dom';

const NavItem = (props) => (
    <li className={classes.li}>
        <Link className={classes.a} to={props.href}>{props.children}</Link>
    </li>
);

export default NavItem;
