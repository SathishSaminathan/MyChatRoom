import React, { Component } from "react";
import { connect } from "react-redux";

import { setUser, clearUser } from "./store/actions";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./config/firebase";
import { Loader, Dimmer } from "semantic-ui-react";
import Layout from "./components/Layout";
// import Loader from "./components/Loader";

class App extends Component {
  state = {
    user: null,
    loading: true
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({ user });
        this.props.setUser(user);
        this.setState({
          loading: false
        });
      } else {
        console.log("no user!!!!");
        this.props.clearUser()
        this.setState({
          user: null,
          loading: false
        });
      }
    });
  }
  render() {
    const { user, loading } = this.state;
    return (
      <div className="">
        {loading ? (
          <Dimmer active>
            <Loader active size="big" content="Loading your chat" />
          </Dimmer>
        ) : (
          <Layout/>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { setUser, clearUser }
)(App);
