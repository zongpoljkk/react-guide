import React, { PureComponent }from "react";
import Person from "./Person/Person";

class People extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //     console.log(`[People.js] getDerivedStateFromProps`)
    //     return state;
    // }

    // If want to check all props then use PureComponent instead
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(`[People.js] shouldComponentUpdate`)
    //     if (nextProps.people !== this.props.people || 
    //         nextProps.changed !== this.props.changed || 
    //         nextProps.clicked !== this.props.clicked) {
    //         return true
    //     }
    //     return false;
    // }

    getSnapshotBeforeUpdate(prevPros, prevState) {
        console.log(`[People.js] getSnapshotBeforeUpdate`)
        return {message: "Snapshot!"}
    }

    componentDidUpdate(prevPros, prevState, snapshot) {
        console.log(`[People.js] componentDidUpdate`)
        console.log(snapshot)
    }

    componentWillUnmount() {
        console.log(`[People.js] componentWillUnmount`)
     }
   

    render() {
        console.log(`[People.js] rendering..`);
        return this.props.people.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                key={person.id}
                click={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event, person.id)}
              />
            );
          });
    }
}

export default People;
