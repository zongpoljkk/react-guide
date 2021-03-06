import React, { Component } from "react";
import "./App.css";
// import Radium, { StyleRoot } from "radium";
// import styled from 'styled-components';
import People from "../components/People/People";
import classes from "./App.css";
import Cockpit from "../components/Cockpit/Cockpit";
import Aux from "../hoc/Aux";
import withClass from "../hoc/withClass";
import AuthContext from "../context/auth-context";
// import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

class App extends Component {
  constructor(props) {
    super(props);
    console.log(`[App.js] constructor`);
  }
  state = {
    people: [
      { id: "sad", name: "Max", age: 28 },
      { id: "gdf", name: "Manu", age: 29 },
      { id: "hde", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
    showPeople: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log(`[App.js] getDerivedStateFromProps`, props);
    return state;
  }

  componentDidMount() {
    console.log(`[App.js] componentDidMount`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(`[App.js] shouldComponentUpdate`);
    return true;
  }

  componentDidUpdate() {
    console.log(`[App.js] componentDidUpdate`);
  }

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

    // update state when depending on old state
    this.setState((prevState, props) => {
      return {
        people: people,
        changeCounter: prevState.changeCounter + 1,
      };
    });
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

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log(`[App.js] render`);
    let people = null;

    if (this.state.showPeople) {
      people = (
        <People
          people={this.state.people}
          changed={this.nameChangedHandler}
          clicked={this.deletePersonHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider 
        value={{
          authenticated: this.state.authenticated, 
          login: this.loginHandler}}>
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPeople={this.state.showPeople}
              peopleLength={this.state.people.length}
              toggle={this.togglePeopleHandler}
            />
          ) : null}
          {people}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
