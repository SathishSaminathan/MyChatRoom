import React, { Component } from "react";
import { Segment, Input, Button } from "semantic-ui-react";

class MessageForm extends Component {
  render() {
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
          onChange={this.handleChange}
          //   className={Errors.some(error => error.message.includes("message")) ?'error':''}
        />
        <Button.Group widths="2" icon>
          <Button
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            // onClick={this.sendMessage}
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
