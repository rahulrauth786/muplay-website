import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddNewUser from "./admin/addNewUser";
import Admindashboard from "./admin/dashboard";
import NewAdmindashboard from "./admin/NewDashBaord";
import Footer from "./footer";
import Home from "./home";
import Home1 from "./home1";
import LoginForm from "./loginForm";

import AllTopChart from "./musicType/alltopChart";
import Mymusic from "./myProfile/myMusic";
import UserOption from "./myProfile/userOptions";
import SearchMusic from "./search";

class MusicAppRouter extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route path="/top_charts" component={AllTopChart} exact={true} />
        <Route path="/mymusic" component={Mymusic} exact={true} />
        <Route path="/user" component={UserOption} exact={true} />
        <Route path="/login" component={LoginForm} exact={true} />
        <Route path="/dashboard" component={Admindashboard} exact={true} />
        <Route path="/newdashboard" component={NewAdmindashboard} exact={true} />
        <Route path="/addNewUser" component={AddNewUser} exact={true} />
        <Route
          path="/search/:searchType"
          component={SearchMusic}
          exact={true}
        />
        <Route
          path="/:option?/:type?/:song_title?/:song_id?"
          component={Home1}
        />
        <Redirect to="/" component={Home1} />
      </Switch>
    );
  }
}

export default MusicAppRouter;
