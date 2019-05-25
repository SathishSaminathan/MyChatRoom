import React, { Component } from "react";
import MessageHeader from "../MessageHeader";
import {
  Comment,
  Segment,
  Button,
  Header,
  Image,
  Modal
} from "semantic-ui-react";

import firebase from "../../config/firebase";
import Message from "../Message";
import MessageForm from "../MessageForm";

class Messages extends Component {
  state = {
    modalToggle: false,
    image: null,
    firebaseMessagesRef: firebase.database().ref("message"),
    messages: null
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ messages: null });
    this.displayMessagesListener(nextProps.messageId);
  }

  modalToggle = (modalToggle, image) => {
    this.setState({
      modalToggle,
      image
    });
  };

  handleClose = () => {
    this.setState({
      modalToggle: false
    });
  };

  displayMessagesListener = messageId => {
    let messages = [];
    const { firebaseMessagesRef } = this.state;
    if (messageId) {
      firebaseMessagesRef.child(messageId).on("child_added", snapshot => {
        console.log(snapshot.val());
        let message = snapshot.val();
        messages.push(message);
        this.setState(
          {
            messages
          },
          () => {
            this.displayMessages();
          }
        );
      });
    }
  };

  displayMessages = () => {
    let messageTemplete = [];
    const { messages } = this.state;
    const {user}= this.props
    console.log("messagessss..", messages);
    messages.map((message, i) => {
      console.log("messageContent...", message);
      messageTemplete.push(
        <Message user={user} modalToggle={this.modalToggle} message={message} key={i} />
      );
    });
    return messageTemplete;
  };

  render() {
    const { modalToggle, image, messages } = this.state;
    const { user, messageId } = this.props;
    console.log("messageId...", messageId);
    return (
      <React.Fragment>
        <MessageHeader />
        <Segment>
          <Comment.Group className="messages">
            {/* Messages */}
            {messages && this.displayMessages()}
            {/* <Message modalToggle={this.modalToggle} />
            <Message />
            <Message /> */}
          </Comment.Group>
          <MessageForm user={user} messageId={messageId} />
        </Segment>
        <Modal open={modalToggle} onClose={this.handleClose}>
          <Modal.Header>User Name</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={image} />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Messages;
