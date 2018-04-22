import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postVote } from "../actions/Voter";
import FaThumbsOUp from "react-icons/lib/fa/thumbs-o-up";
import FaThumbsODown from "react-icons/lib/fa/thumbs-o-down";
import { Button, ButtonGroup } from "reactstrap";

class Voter extends Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  updateVote = option => {
    this.props.vote({
      id: this.props.id,
      option: option,
      type: this.props.type
    });
  };

  render() {
    const { score } = this.props;
    return (
      <div>
        Vote Score: {score}
        <ButtonGroup>
          <Button color="link" onClick={() => this.updateVote("upVote")}>
            <FaThumbsOUp />
          </Button>
          <Button color="link" onClick={() => this.updateVote("downVote")}>
            <FaThumbsODown />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  vote: data => dispatch(postVote(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Voter);
