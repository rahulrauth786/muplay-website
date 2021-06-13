import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "./footer";
import Home from "./home";
import LoginForm from "./loginForm";

import AllTopChart from "./musicType/alltopChart";
import Mymusic from "./myProfile/myMusic";
import UserOption from "./myProfile/userOptions";
import PageNotFound from "./pageNotFound";
import SearchMusic from "./search";

class MusicAppRouter extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route path="/topCharts" component={AllTopChart} exact={true} />
        <Route path="/mymusic" component={Mymusic} exact={true} />
        <Route path="/user" component={UserOption} exact={true} />
        <Route path="/login" component={LoginForm} exact={true} />
        <Route path="/footer" component={Footer} exact={true} />
        <Route
          path="/search/:searchType"
          component={SearchMusic}
          exact={true}
        />

        <Route path="/:option/:type" component={Home} exact={true} />
        <Route path="/" component={Home} exact={true} />
        <Route path="/404" component={PageNotFound} exact={true} />
        <Redirect to="*" to="/404" />
      </Switch>
    );
  }
}

export default MusicAppRouter;
