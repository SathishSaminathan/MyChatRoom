import React, { Component } from "react";
import { Input, Label, Menu, Image, Button } from "semantic-ui-react";

import { connect } from "react-redux";
import firebase from "../../config/firebase";

class ChatList extends Component {
  state = {
    activeItem: "inbox",
    firebaseChatListRef: firebase.database().ref("users"),
    firebaseProfileRef: firebase.database().ref(this.props.user.uid),
    chatList: [],
    chatTemplate: [],
    searchKey: null
  };

  componentDidMount() {
    // this.chatListListener();
  }

  handleChange = e => {
    this.setState(
      {
        searchKey: e.target.value
      },
      () => this.searchChatList()
    );
  };

  getTheUserList = () => {
    const { firebaseProfileRef } = this.state;
    firebaseProfileRef
      .child("messages/direct")
      .on("child_added", snapshot => {
        
      });
  };

  searchChatList = () => {
    let chatList = [];
    const { firebaseChatListRef, searchKey } = this.state;
    this.setState({
      chatList: []
    });
    if (searchKey.length == 0) {
      // this.chatListListener();
    } else {
      firebaseChatListRef
        .orderByChild("uniqueName")
        // .startAt(`${searchKey}`)
        // .endAt(`${searchKey}\uf8ff`)
        .equalTo(`@${searchKey}`)
        .on("child_added", snapshot => {
          let chat = snapshot.val();
          // console.log("snapshot.val()...", snapshot.val());
          chatList.push(chat);
          this.setState(
            {
              chatList
            },
            () => {
              this.renderChatList();
            }
          );
        });
    }
  };

  chatListListener = () => {
    let chatList = [];
    const { firebaseChatListRef } = this.state;
    firebaseChatListRef.on("child_added", snapshot => {
      let chat = snapshot.val();
      if (chat.uid !== this.props.user.uid) {
        chatList.push(chat);
      }
      this.setState(
        {
          chatList
        },
        () => {
          this.renderChatList();
        }
      );
    });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderChatList = () => {
    let chatTemplate = [];
    const { activeItem, chatList } = this.state;
    chatList &&
      chatList.map((chat, i) => {
        if (chat.uid !== this.props.user.uid) {
          chatTemplate.push(
            <Menu.Item
              // name="inbox"
              // active={activeItem === "inbox"}
              onClick={this.handleItemClick}
              key={i}
            >
              <Image src={chat.profilePic} avatar />
              <span>{chat.name}</span>
              <Label color="blue">1</Label>
            </Menu.Item>
          );
        }
      });
    return chatTemplate;
  };

  render() {
    const { activeItem } = this.state;
    return (
      <React.Fragment>
        <Menu vertical size="massive" fluid>
          <Menu.Item>
            <Input
              icon="search"
              placeholder="Search contact..."
              onChange={this.handleChange}
            />
          </Menu.Item>
          {this.renderChatList()}
          {/* <Menu.Item
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
          </Menu.Item> */}
        </Menu>
        <Button primary>ADD GROUP</Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser
  };
};

export default connect(
  mapStateToProps,
  null
)(ChatList);
