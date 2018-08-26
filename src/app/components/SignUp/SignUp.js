import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import classes from "./SignUp.scss";

import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import ImgBg from "../ImgBg/ImgBg";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    repeatPassword: "",
    username: "",
    errors: []
  };

  submit = e => {
    e.preventDefault();
    fetch("/api/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        repeatPassword: this.state.repeatPassword,
        username: this.state.username
      })
    })
      .then(res => {
        if (res.status == 200) {
          this.props.history.push("/Login");
        }
      })
      .catch(err => this.setState({ err }));
  };

  onChangeHandler = e => {
    const newState = {
      [e.target.name]: e.target.value
    };
    this.setState(newState);
  };

  render() {
    return (
      <div className={classes.signUp}>
        <ImgBg />
        <Logo />
        <form className={classes.form} action="" onSubmit={this.submit}>
          <h2 className={classes.h2}>Sign up</h2>
          <input
            className={classes.input}
            type="email"
            placeholder="Email Address"
            name="email"
            required
            autoFocus
            onChange={this.onChangeHandler}
          />
          <input
            className={classes.input}
            type="password"
            placeholder="Password"
            name="password"
            minLength={4}
            required
            onChange={this.onChangeHandler}
          />
          <input
            className={classes.input}
            type="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            minLength={4}
            required
            onChange={this.onChangeHandler}
          />
          <input
            className={classes.input}
            type="text"
            placeholder="Username"
            name="username"
            minLength={2}
            maxLength={12}
            required
            onChange={this.onChangeHandler}
          />
          <Button bg="green_login">Sign Up</Button>
        </form>
        <p className={classes.signUpP}>
          Already have an account?{" "}
          <Link className={classes.signUpLink} to="/Login">
            Log in
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(SignUp);
