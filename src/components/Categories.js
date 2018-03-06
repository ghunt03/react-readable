import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../actions";
import { Link } from 'react-router-dom'

class Categores extends Component {
  
  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const { categoeryList } = this.props;
    return (
      <div className="Categories">
        <ul>
          <li>
          <Link to='/' >All Categores</Link>
            </li>
          {categoeryList.map( (category) => (
            <li className="cat-filter" key={category.name}>
              <Link to={category.path} >{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = ({ categories }) => ({
  categoeryList: categories
})

const mapDispatchToProps = (dispatch) => ({
  getCategories: data => dispatch(fetchCategories())
})
  

export default connect(mapStateToProps, mapDispatchToProps)(Categores);
