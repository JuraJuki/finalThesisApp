import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.scss";
import { withRouter } from "react-router-dom";

import Button from "../Button/Button";
import withToken from "../hoc/withToken";
import Logo from "../Logo/Logo";
import ImgBg from "../ImgBg/ImgBg";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: false
  };

  submit = e => {
    e.preventDefault();
    fetch("/api/accounts/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.token);
        this.setState({error : false});
        this.props.history.push(`/`);
      })
      .catch(err => {
        console.log(err);
        this.setState({error : true});
      });
  };

  onChangeHandler = e => {
    const newState = {
      [e.target.name]: e.target.value
    };
    this.setState(newState);
  };

  render() {
    let errorMessage;
    if (this.state.error){
     errorMessage = <span className={classes.errorMessage}>Incorrect email and/or password!</span>
    }

    return (
      <div className={classes.login}>
        <ImgBg />
        <Logo className={classes.logo} />
        <form className={classes.form} action="" onSubmit={this.submit}>
          <h2 className={classes.h2}>Log in</h2>
          <input
            className={classes.input}
            type="email"
            name="email"
            placeholder="Email Address"
            autoFocus
            required
            onChange={this.onChangeHandler}
          />
          <input
            className={classes.input}
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={this.onChangeHandler}
          />
          <Button bg="green_login">Log In</Button>
          {errorMessage}
          <Link className={classes.pwLink} to="/">
            <p>Forgot password?</p>
          </Link>
        </form>
        <p className={classes.signUpP}>
          Don't have an account?{" "}
          <Link className={classes.signUpLink} to="/Signup">
            Sign Up
          </Link>
        </p>
      </div>
    );
  }
}

export default withToken(withRouter(Login));
