import React, { Component } from "react";
import { Button, Popup, Icon, Divider } from "semantic-ui-react";

import { connect } from "react-redux";
import firebase from "../../config/firebase";
import "./Header.css";
import images from "../../assets/images/image";

const googleAuth = new firebase.auth.GoogleAuthProvider();

class Header extends Component {
  state = {
    buttonLoading: false
  };
  handleLogin = () => {
    this.setState({
      buttonLoading: true
    });
    const login = firebase.auth().signInWithPopup(googleAuth);
    login
      .then(() => {
        console.log("completed");
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
    user: state.user.current_user
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
