import React from "react";
import Categories from "./Categories";


/**
 * @description class function for rendering the header of the page showing the categories
 */


const Header = () => (
  <div>
    <div className="nav">
      <h1 className="header">Readable</h1>
      <Categories />
    </div>
  </div>
);



export default Header;


