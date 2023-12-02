import React from "react";
import Card from "./Card";
import "./Swimlane.css";

export default class Swimlane extends React.Component {
  render() {
    const { name, dragulaRef, clients } = this.props;
    const cards = clients.map((client) => {
      const { id, name, description, status } = client;
      return (
        <Card
          key={id}
          id={id}
          name={name}
          description={description}
          status={status}
        />
      );
    });
    return (
      <div className="Swimlane-column">
        <div className="Swimlane-title">{name}</div>
        <div className="Swimlane-dragColumn" ref={dragulaRef}>
          {cards}
        </div>
      </div>
    );
  }
}
