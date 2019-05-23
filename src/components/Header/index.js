import React, { Component } from "react";
import { Button, Popup, Icon, Divider } from "semantic-ui-react";

import firebase from "../../config/firebase";
import "./Header.css";
import images from "../../assets/images/image";

const googleAuth = new firebase.auth.GoogleAuthProvider();

class Header extends Component {
  handleLogin = () => {
    firebase.auth().signInWithPopup(googleAuth);
  };
  handleLogout = () => {
    firebase.auth().signOut();
  };
  render() {
    const { profilePic } = this.props;
    console.log(profilePic);
    return (
      <div className="header_container">
        <div className="logo">
          <img src={images.logo} />
        </div>
        <ul>
          {profilePic ? (
            <li>
              <Popup
                trigger={
                  <a className='pic_area'>
                    <img className="profile_pic" src={profilePic} />
                  </a>
                }
                position="bottom right"
                on="click"
              >
                <div>
                  <Divider/>
                <Button primary onClick={this.handleLogout}>
                  Logout
                </Button>
                </div>
              </Popup>
            </li>
          ) : (
            <li>
              <Button primary onClick={this.handleLogin}>
                Login
              </Button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Header;
