import React from "react";
import "./Card.css";

export default class Card extends React.Component {
  render() {
    const { id, name, status } = this.props;
    let classes = "Card Card-";
    classes +=
      status === "backlog"
        ? "grey"
        : status === "in-progress"
        ? "blue"
        : "green";

    return (
      <div className={classes} data-id={id} data-status={status}>
        <div className="Card-title">{name}</div>
      </div>
    );
  }
}
