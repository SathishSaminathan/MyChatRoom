import React, { Component } from "react";
import { Comment } from "semantic-ui-react";

class Message extends Component {
  state = { modalOpen: false };

  handleOpen = (url) => {
    this.setState({ modalOpen: true }, () =>
      this.props.modalToggle(this.state.modalOpen, url)
    );
  };

  isOwnMessage = (message, user) => {
    // return message.user.id === user.uid ? "message__self" : "";
  };
  render() {
    return (
      <div>
        <Comment>
          <Comment.Avatar
            src="https://randomuser.me/api/portraits/men/11.jpg"
            onClick={() => this.handleOpen("https://randomuser.me/api/portraits/men/11.jpg")}
          />
          <Comment.Content className={this.isOwnMessage("message", "user")}>
            <Comment.Author as="a">Sathish</Comment.Author>
            <Comment.Metadata>12.06.2019</Comment.Metadata>
            <Comment.Text>Working</Comment.Text>{" "}
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}

export default Message;
