import React, { useEffect, useRef, useContext } from "react";
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = props => {
    const toggleButtonRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    // useEffect = DidMount + DidUpdate
    useEffect(() => {
      console.log(`[Cockpit.js] useEffect`);
      // Http Request...
      // setTimeout(() => {
      //   alert('Saved data to cloud');
      // }, 1000);
      toggleButtonRef.current.click();
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
      <button ref={toggleButtonRef} className={btnClass} onClick={props.toggle}>
        Toggle People
      </button>
      {<button onClick={authContext.login}>Login</button>}
    </div>
  );    
};

export default React.memo(cockpit);
