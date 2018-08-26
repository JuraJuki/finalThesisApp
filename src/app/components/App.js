import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import classes from "./App.scss";

import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Upload from "./Upload/Upload";
import ImageComponent from "./ImageComponent/ImageComponent";
import LogoSmall from "../../server/public/static/logoSmall.png";
import User from "./Header/User/User";
import UserProfile from "./UserProfile/UserProfile";
import SearchPage from "./SearchPage/SearchPage";
import VideoBg from "./VideoBg/VideoBg";
import PublicUserProfile from "./UserProfile/PublicUserProfile";
import Settings from "./UserProfile/Settings";

const mainPage = () => (
  <div className={classes.mainPage}>
    <VideoBg />
    <Header />
    <div className={classes.main}>
      <Hero />
    </div>
  </div>
);

const selectedImagePage = () => (
  <div>
    <ImageComponent />
  </div>
);

const UserProfilePage = () => (
  <div className={classes.userProfilePageDiv}>
    <div className={classes.navigation}>
      <LogoSmall />
      <User>
        <Link to="/searchpage">Search</Link>
      </User>
    </div>
    <div className={classes.userProfile}>
      <UserProfile />
    </div>
  </div>
);

const PublicProfilePage = () => (
  <div className={classes.userProfilePageDiv}>
    <div className={classes.navigation}>
      <LogoSmall />
      <User>
        <Link to="/searchpage">Search</Link>
      </User>
    </div>
    <div className={classes.userProfile}>
      <PublicUserProfile />
    </div>
  </div>
);

const ErrPage = () => (
  <div>
    <h1>Error 404 route not found</h1>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={mainPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/upload" component={Upload} />
      <Route path="/searchpage" component={SearchPage} />
      <Route path="/img/:imgId" component={selectedImagePage} />
      <Route path="/profile" exact component={UserProfilePage} />
      <Route path="/public_profile/:id" component={PublicProfilePage} />,
      <Route path="/profile/settings"  component={Settings} />
      <Route path="*" component={ErrPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
