import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import { connect } from "react-redux";

import Header from "../Header";
import ChatList from "../ChatList";
import Messages from "../Messages";
import { setActiveMessage } from "../../store/actions";
import "./Layout.css";

class Layout extends Component {
  state = {
    messageId: null
  };
  activeMessage = messageId => {
    this.setState(
      {
        messageId
      },
      () => this.props.setActiveMessage(messageId)
    );
  };

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Header />
        {user && (
          <div style={{ padding: "10px" }}>
            <Grid>
              <GridRow>
                <GridColumn mobile={8} computer={5}>
                  <ChatList activeMessage={this.activeMessage} />
                </GridColumn>
                <GridColumn computer={8}>
                  <Messages user={user} messageId={this.state.messageId} />
                </GridColumn>
              </GridRow>
            </Grid>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    messageId: state.user.currentUser&& state.user.currentUser.messageId
  };
};

export default connect(
  mapStateToProps,
  { setActiveMessage }
)(Layout);
