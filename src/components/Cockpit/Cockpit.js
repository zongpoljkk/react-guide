import React, { useEffect } from "react";
import classes from './Cockpit.css';

const cockpit = props => {
    // useEffect = DidMount + DidUpdate
    useEffect(() => {
      console.log(`[Cockpit.js] useEffect`);
      // Http Request...
      setTimeout(() => {
        alert('Saved data to cloud');
      }, 1000);
      return () => {
        console.log(`[Cockpit.js] cleanup work in useEffect`)
      };
    }, []);

    useEffect(() => {
      console.log(`[Cockpit.js] 2nd useEffect`);
      return () => {
        console.log(`[Cockpit.js] cleanup work in 2nd useEffect`)
      };
    });

    const assignedClasses = [];
    let btnClass ='';
    if(props.showPeople) {
        btnClass = classes.Red;
    }

    if (props.peopleLength <= 2) {
      assignedClasses.push(classes.red);
    }
    if (props.peopleLength <= 1) {
      assignedClasses.push(classes.bold);
    }

  return (
    <div className={classes.Cockpit}>
      <h1>Hi, I'm {props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button className={btnClass} onClick={props.toggle}>
        Toggle People
      </button>
    </div>
  );
};

export default React.memo(cockpit);
