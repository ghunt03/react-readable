import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../actions";
import { Link } from "react-router-dom";
import { capitalize } from "../utils/helpers";

class Categores extends Component {
  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props;
    console.log(categories, "cats");
    return (
      <div className="category-list">
        <ul>
          <li>
            <Link to="/">All Categores</Link>
          </li>
          {categories.map(category => (
            <li className="cat-filter" key={category.name}>
              <Link to={`/${category.path}`}>{capitalize(category.name)}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.categories
});

const mapDispatchToProps = dispatch => ({
  getCategories: data => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categores);
