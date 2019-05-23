import React, { Component } from "react";
import { Input, Label, Menu, Image } from "semantic-ui-react";

class ChatList extends Component {
  state = { activeItem: "inbox" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleChange=(e)=>{
      console.log(e.target.value)
  }

  render() {
    const { activeItem } = this.state;
    return (
      <React.Fragment>
        <Menu vertical size="massive" fluid>
          <Menu.Item>
            <Input icon="search" placeholder="Search contact..." onChange={this.handleChange} />
          </Menu.Item>
          <Menu.Item
            name="inbox"
            active={activeItem === "inbox"}
            onClick={this.handleItemClick}
          >
            <Image
              src="https://randomuser.me/api/portraits/men/11.jpg"
              avatar
            />
            <span>Username</span>
            <Label color="blue">1</Label>
          </Menu.Item>
          <Menu.Item
            name="spam"
            active={activeItem === "spam"}
            onClick={this.handleItemClick}
          >
            <Image
              src="https://randomuser.me/api/portraits/men/11.jpg"
              avatar
            />
            <span>Tamil</span>
            <Label color="blue">1</Label>
          </Menu.Item>
          <Menu.Item
            name="updates"
            active={activeItem === "updates"}
            onClick={this.handleItemClick}
          >
            <Image
              src="https://randomuser.me/api/portraits/men/11.jpg"
              avatar
            />
            <span>Naveen</span>
            <Label color="blue">1</Label>
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}

export default ChatList;
