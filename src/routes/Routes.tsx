import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Blog from "../components/Bolg";
import Documents from "../components/Documents";
import Join from "../components/Join";
import Login from "../components/Login";
import Main from "../components/Main";
import User from "../components/User";
import Worship from "../components/Worship";
import Header from "../components/Header";
import Notice from "../components/Notice";

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/notice">
          <Notice />
        </Route>
        <Route path="/worship">
          <Worship />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/documents">
          <Documents />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
