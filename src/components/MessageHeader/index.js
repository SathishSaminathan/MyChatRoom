import React, { Component } from "react";
import { Segment, Header, Icon, Input } from "semantic-ui-react";

class MessageHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <Segment clearing>
          <Header
            floated="left"
            as="h2"
            style={{
              marginBottom: 0
            }}
          >
            <span>
              Channel
              <Icon name="star outline" color="black" />
            </span>
            <Header.Subheader>2 Users</Header.Subheader>
          </Header>
          <Header floated="right">
            <Input
              size="mini"
              icon="search"
              name="SearchTerm "
              placeholder="Search Messages"
            />
          </Header>
        </Segment>
      </React.Fragment>
    );
  }
}

export default MessageHeader;
