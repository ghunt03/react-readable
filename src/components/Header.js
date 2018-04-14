import React, { Component } from "react";
import Categories from "./Categories";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <div className="nav">
          <h1 className="header">Readable</h1>
          <Categories />
        </div>
        
      </div>
    );
  }
}

export default Header;