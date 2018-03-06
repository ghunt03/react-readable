import React, { Component } from "react";
import { Route } from "react-router-dom";
import Categories from "./Categories";
import Posts from "./Posts";
class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="nav">
          <h1 className="header">Readable</h1>
        </div>
        <Categories />
        <Route exact path="/" component={Posts} />
        <Route path="/:category" component={Posts} />
      </div>
    );
  }
}

export default App;
