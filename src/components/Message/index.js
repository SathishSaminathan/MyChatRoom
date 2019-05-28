import React, { Component } from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";

class Message extends Component {
  state = { modalOpen: false };

  handleOpen = url => {
    this.setState({ modalOpen: true }, () =>
      this.props.modalToggle(this.state.modalOpen, url)
    );
  };

  isOwnMessage = (message, user) => {
    return message.createdBy.senderId === user.uid ? "message__self" : "";
  };

  timeFromNow = timestamp => moment(timestamp).fromNow();

  render() {
    const { message, user } = this.props;

    return (
      <div>
        <Comment>
          <Comment.Avatar
            src={message.createdBy.senderPic}
            onClick={() => this.handleOpen(message.createdBy.senderPic)}
          />
          <Comment.Content className={this.isOwnMessage(message, user)}>
            <Comment.Author as="a">
              {message.createdBy.senderName}
            </Comment.Author>
            <Comment.Metadata>
              {this.timeFromNow(message.timestamp)}
            </Comment.Metadata>
            <Comment.Text>{message.messageContent}</Comment.Text>
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}

export default Message;
