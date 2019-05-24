import React, { Component } from "react";
import { Button, Popup, Icon, Divider } from "semantic-ui-react";

import { connect } from "react-redux";
import firebase from "../../config/firebase";
import "./Header.css";
import images from "../../assets/images/image";

const googleAuth = new firebase.auth.GoogleAuthProvider();

class Header extends Component {
  state = {
    buttonLoading: false,
    firebaseUserRef: firebase.database().ref("users")
  };
  componentDidMount() {
    // this.handleLogin();
  }
  handleLogin = () => {
    this.setState({
      buttonLoading: true
    });
    const login = firebase.auth().signInWithPopup(googleAuth);
    login
      .then(user => {
        console.log("completed");
        this.createUser(user);
        this.setState({
          buttonLoading: false
        });
      })
      .catch(err => {
        console.log("err...", err);
        this.setState({
          buttonLoading: false
        });
      });
  };

  handleLogout = () => {
    firebase.auth().signOut();
  };

  userValue = user => {
    return {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      profilePic: user.photoURL,
      uniqueName:""
    };
  };

  createUser = ({ user }) => {
    const { firebaseUserRef } = this.state;
    console.log(user);
    firebaseUserRef.child(user.uid).set(this.userValue(user));
    console.log("user updated!!", user);
  };
  render() {
    const { buttonLoading } = this.state;
    const { profilePic, user } = this.props;
    return (
      <div className="header_container">
        <div className="logo">
          <img src={images.logo} />
        </div>
        <ul>
          {user ? (
            <li>
              <Popup
                trigger={
                  <a className="pic_area">
                    <img className="profile_pic" src={user.photoURL} />
                  </a>
                }
                position="bottom right"
                on="click"
              >
                <div>
                  <Divider />
                  <Button primary onClick={this.handleLogout}>
                    Logout
                  </Button>
                </div>
              </Popup>
            </li>
          ) : (
            <li>
              <Button
                primary
                onClick={this.handleLogin}
                loading={buttonLoading}
                disabled={buttonLoading}
              >
                Login
              </Button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state.user.current_user..",state.user.current_user.photoURL)
  return {
    user: state.user.currentUser
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
