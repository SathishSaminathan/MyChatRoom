import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/";
import firebase from "./config/firebase";

class App extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({ user });
      } else {
        console.log("no user!!!!");
        this.setState({
          user: null
        });
      }
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="">
        <Header profilePic={user && user.photoURL} />
      </div>
    );
  }
}

export default App;
