import React, { Component } from "react";
import FilledStar from "../../images/beer-svgrepo-com (1).svg";
import EmptyStar from "../../images/pint-svgrepo-com.svg";



export class Stars extends Component {
  constructor(props) {
    super(props);
    this.state = { currRating: 0 };
    this.onHover = this.onHover.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onHover(e) {
    if (e.target.className === "star") {
      this.setRating(e.target.dataset.value);
    }
  }

  onClick(e) {
    const newRating = e.target.dataset.value;
    if (newRating === this.state.currRating) {
        this.setRating(newRating);
        if (this.props.onRatingChange) {
            this.props.onRatingChange(newRating);
        }
    }
}

  setRating(value) {
    this.setState({ currRating: value });
  }

  render() {
    const effectiveRating = this.state.currRating || this.props.starRating;

    return [...Array(this.props.starCount).keys()].map((index) => {
      return (
        <img
          data-value={index + 1}
          className="star"
          onMouseOver={this.onHover}
          onClick={this.onClick}
          src={index + 1 <= this.state.currRating ? FilledStar : EmptyStar}
          alt={
            index + 1 <= this.state.currRating ? "filled star" : "empty star"
          }
        />
      );
    });
  }
}

export const RatingSystem = (props) => {
  return (
    <div>
      <h1>5 star rating system</h1>
      <h2>Select a rating:</h2>
      <div className="rating">
        <Stars starCount={props.starCount} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <RatingSystem starCount={5} />
    </div>
  );
}
