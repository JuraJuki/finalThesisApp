import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const withToken = ComponentToRender => {
  const getToken = () => localStorage.getItem("token");
  return class extends Component {
    constructor(props){
      super(props);
    }
    GetUserInfo = async () => {
      if(!getToken()){
        return;
      }

      return await fetch("/api/users", {
        method: "get",
        headers: { Authorization: `Bearer ${getToken()}` }
      }).then(x => x.json());
    };

    render() {
      return <ComponentToRender token={getToken()} getUserInfo={this.GetUserInfo} {...this.props}/>;
    }
  };
};
export default comp => withRouter(withToken(comp));
