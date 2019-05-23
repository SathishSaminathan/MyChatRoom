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
import Message from "../Message";
import MessageForm from "../MessageForm";

class Messages extends Component {
  state = {
    modalToggle: false, image:null
  };

  modalToggle = (modalToggle, image) => {
    this.setState({
      modalToggle, image
    });
  };
  handleClose = () => {
    this.setState({
      modalToggle: false
    });
  };

  render() {
    const { modalToggle, image } = this.state;
    return (
      <React.Fragment>
        <MessageHeader />
        <Segment>
          <Comment.Group className="messages">
            {/* Messages */}
            {/* {this.displayMessages(Messages)} */}
            <Message modalToggle={this.modalToggle} />
            <Message />
            <Message />
          </Comment.Group>
          <MessageForm/>
        </Segment>
        <Modal open={modalToggle} onClose={this.handleClose}>
          <Modal.Header>User Name</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size="medium"
              src={image}
            />
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
