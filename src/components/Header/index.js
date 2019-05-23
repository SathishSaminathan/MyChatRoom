import React, { Component } from "react";

import "./Header.css";
import { Button } from "semantic-ui-react";

class Header extends Component {
  render() {
    return (
      <div className="header_container">
        <ul>
          {/* <li>
            <a>
              <img className="profile_pic" src="https://randomuser.me/api/portraits/men/35.jpg" />
            </a>
          </li> */}
          <li>
            <Button primary>Login</Button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
