import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Upload.scss";


import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import withToken from "../hoc/withToken";
import ImgBg from "../ImgBg/ImgBg";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.token = props.token;
  }
  state = {
    name: "",
    description: "",
    tags: ""
  };

  submit = e => {
    e.preventDefault();
    const image = Array.from(e.target.children).filter(
      el => el.type == "file"
    )[0];
    const data = Object.assign(
      {
        image: image.files[0]
      },
      this.state
    );
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("tags", this.state.tags);
    formData.append("image", data.image);
    console.log(formData);
    fetch("/api/images/upload", {
      method: "post",
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      body: formData
    }).then(x => {
      this.props.history.push('/profile');
    }).catch(err => {
      //do something with error
    });
  };

  onChangeHandler = e => {
    const path = {
      [e.target.name]: e.target.value
    };
    this.setState(path);
  };

  render() {
    return (
      <div className={classes.upload}>
        <ImgBg />
        <Logo className={classes.logo} />
        <form className={classes.form} action="" onSubmit={this.submit}>
          <h2 className={classes.h2}>Upload a Wallpaper</h2>
          <input
            className={classes.inputFile}
            type="file"
            name="file"
            placeholder="Choose a Wallpaper"
            required
            onChange={this.onChangeHandler}
          />
          <input
            className={classes.input}
            type="text"
            name="name"
            placeholder="Give your wallpaper a name"
            minLength={3}
            required
            onChange={this.onChangeHandler}
          />
          <input
            className={classes.input}
            type="text"
            name="description"
            placeholder="Short description goes here.."
            maxLength={140}
            required
            onChange={this.onChangeHandler}
          />
          <input
            className={classes.input}
            type="text"
            name="tags"
            placeholder="..And the tags here!"
            required
            onChange={this.onChangeHandler}
          />
          <Button bg="green_login">Upload</Button>
        </form>
      </div>
    );
  }
}

export default withToken(withRouter(Upload));
