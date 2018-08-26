import React, { Component } from 'react';
import classes from "./Search.scss";


import { withRouter } from "react-router-dom";


class Search extends Component {
    constructor(props){
        super(props);
    }
    state = {
        value: ""
    };

    handleChange = e => this.setState({ value: e.target.value ? e.target.value : "" });

    submitHandler = e => {
        e.preventDefault();
        this.props.history.push(`/Searchpage?v=${this.state.value}`);
    }

    render() {
        return (
            <form className={this.props.class || ""} onSubmit={this.submitHandler}>
                <input className={classes.inp} type="search" placeholder="Search Wallpapers.." onChange={this.handleChange} />
                <input className={classes.link + " " + classes.submit} type="submit" value="Search" />
            </form>
        );
    }
}

export default withRouter(Search);
