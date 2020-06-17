import React, { Component } from "react";
import "./App.css";
// import Radium, { StyleRoot } from "radium";
// import styled from 'styled-components';
import People from "../components/People/People";
import classes from "./App.css";
import Cockpit from "../components/Cockpit/Cockpit";
// import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

class App extends Component {
  state = {
    people: [
      { id: "sad", name: "Max", age: 28 },
      { id: "gdf", name: "Manu", age: 29 },
      { id: "hde", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
    showPeople: false,
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.people.findIndex((p) => {
      return p.id === id;
    });

    // const person = Object.assign({}, this.state.people[personIndex])
    const person = {
      ...this.state.people[personIndex],
    };

    person.name = event.target.value;

    const people = [...this.state.people];
    people[personIndex] = person;

    this.setState({ people: people });
  };

  deletePersonHandler = (personIndex) => {
    // const people = this.state.people.slice();
    const people = [...this.state.people];
    people.splice(personIndex, 1);
    this.setState({ people: people });
  };

  togglePeopleHandler = () => {
    const toggling = this.state.showPeople;
    this.setState({ showPeople: !toggling });
  };

  render() {
    let people = null;

    if (this.state.showPeople) {
      people = 
          <People
            people={this.state.people}
            changed={this.nameChangedHandler}
            clicked={this.deletePersonHandler}
          />
    }

    return <div className={classes.App}>
      <Cockpit 
      showPeople={this.state.showPeople} 
      people={this.state.people}
      toggle={this.togglePeopleHandler}/>
      {people}
      </div>;
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
