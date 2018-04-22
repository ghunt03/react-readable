import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Posts from "./Posts";
import Post from "./Post";
class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />

        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/:category/:id" component={Post} />
          <Route path="/:category" component={Posts} />
          
        </Switch>
      </div>
    );
  }
}

export default App;
