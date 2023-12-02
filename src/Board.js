import React from "react";
import "dragula/dist/dragula.css";
import Swimlane from "./Swimlane";
import staticClients from "./StaticBoardData";
import "./Board.css";
import dragula from "dragula";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(
          (client) => !client.status || client.status === "backlog"
        ),
        inProgress: clients.filter(
          (client) => client.status && client.status === "in-progress"
        ),
        complete: clients.filter(
          (client) => client.status && client.status === "complete"
        ),
      },
    };

    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    };
    this.drake = null;
  }

  componentDidMount() {
    this.drake = dragula([
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current,
    ]);

    this.drake.on("drop", (el, target, source, sibling) => {
      const { backlog, inProgress, complete } = this.swimlanes;
      // Let's check whether drop occurred in the swimlane.
      if (target === backlog.current) {
        el.classList = ["Card Card-title", " Card-grey"];
      } else if (target === inProgress.current) {
        el.classList = ["Card Card-title", " Card-blue"];
      } else if (target === complete.current) {
        el.classList = ["Card Card-title", " Card-green"];
      }
    });
  }

  componentWillUnmount() {
    // Cleanup resources in componentWillUnmount.
    if (this.drake) this.drake.destroy();
  }

  getClients() {
    return staticClients.map((companyDetails) => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }
  renderSwimlane(name, clients, ref) {
    return <Swimlane name={name} clients={clients} dragulaRef={ref} />;
  }

  render() {
    const { clients } = this.state;
    const { swimlanes } = this;
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane(
                "Backlog",
                clients.backlog,
                swimlanes.backlog
              )}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane(
                "In Progress",
                clients.inProgress,
                swimlanes.inProgress
              )}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane(
                "Complete",
                clients.complete,
                swimlanes.complete
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
