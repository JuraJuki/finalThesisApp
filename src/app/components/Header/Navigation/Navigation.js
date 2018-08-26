import React from 'react';
import classes from "./Navigation.scss";

import NavItem from "./NavItem/NavItem";


const Navigation = () => (
    <ul className={classes.navigation}>
        <NavItem href="/Searchpage?searchType=newest">Newest</NavItem>
        <NavItem href="/Searchpage?searchType=top">Top</NavItem>
        <NavItem href="/Searchpage?searchType=random">Random</NavItem>
    </ul>
);

export default Navigation;
