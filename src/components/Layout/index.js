import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import { connect } from "react-redux";

import "./Layout.css";
import Header from "../Header";
import ChatList from "../ChatList";
import Messages from "../Messages";

class Layout extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Header />
        {user && (
          <div style={{ padding: "10px" }}>
            <Grid>
              <GridRow>
                <GridColumn mobile={16} computer={5}>
                  <ChatList />
                </GridColumn>
                <GridColumn width={11}>
                  <Messages />
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
  // console.log("state.user.current_user..",state.user.current_user.photoURL)
  return {
    user: state.user.current_user
  };
};

export default connect(
  mapStateToProps,
  null
)(Layout);
