import React, { Component } from "react";
import { Segment, Input, Button } from "semantic-ui-react";

import firebase from "../../config/firebase";

class MessageForm extends Component {
  state = {
    message: "",
    firebaseMessagesRef: firebase.database().ref("message")
  };

  createMessage = user => {
    const { message } = this.state;
    const newMessage = {
      createdBy: {
        senderId: user.uid,
        senderName: user.displayName,
        senderPic: user.photoURL
      },
      messageContent: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    return newMessage;
  };

  sendMessage = (user, messageId) => {
    const { message, firebaseMessagesRef } = this.state;
    if (message && messageId) {
      firebaseMessagesRef
        .child(messageId)
        .push(this.createMessage(user))
        .then(() => {
          this.setState({ message: "" });
        });
    }
  };
  render() {
    const { message } = this.state;
    const { user, messageId } = this.props;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="Message"
          style={{
            marginBottom: "0.7em"
          }}
          //   value={Message}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message"
          value={message}
          onChange={e => this.setState({ message: e.target.value })}
          //   className={Errors.some(error => error.message.includes("message")) ?'error':''}
        />
        <Button.Group widths="2" icon>
          <Button
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            onClick={() => this.sendMessage(user, messageId)}
            // disabled={Loading}
            // loading={Loading}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
            // onClick={this.openModal}
          />
          {/* <FileModal IsModalVisible={IsModalVisible} closeModal={this.closeModal}/> */}
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
