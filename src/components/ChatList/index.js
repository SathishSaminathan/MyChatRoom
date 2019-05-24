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
    searchKey: "",
    userList: []
  };

  componentDidMount() {
    this.chatListListener();
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
      .on("child_added", snapshot => {});
  };

  searchChatList = () => {
    let userList = [];
    const { firebaseChatListRef, searchKey } = this.state;
    this.setState({
      userList: []
    });
    if (searchKey.length == 0) {
      // this.chatListListener();
    } else {
      firebaseChatListRef
        .orderByChild("name")
        // .startAt(`${searchKey}`)
        // .endAt(`${searchKey}\uf8ff`)
        .equalTo(`${searchKey}`)
        .on("child_added", snapshot => {
          let chat = snapshot.val();
          // console.log("snapshot.val()...", snapshot.val());
          userList.push(chat);
          this.setState(
            {
              userList
            },
            () => {
              this.renderUserList();
            }
          );
        });
    }
  };

  chatListListener = () => {
    let chatList = [];
    const { firebaseProfileRef } = this.state;
    firebaseProfileRef.child("messages/direct").on("child_added", snapshot => {
      let chat = snapshot.val();
      // if (chat.uid !== this.props.user.uid) {
      chatList.push(chat);
      console.log(chatList);
      // }
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

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  checkUserIsFriend = chat => {
    return chat.friendsList.indexOf(this.props.user.uid);
  };

  createMsg = chat => {
    const { user } = this.props;
    console.log("user...", user);

    const newMessage = {
      receiverName: chat.name,
      receiverId: chat.uid,
      receiverPic: chat.profilePic,
      senderDetails: {
        senderId: user.uid,
        senderName: user.displayName,
        senderPic: user.photoURL,
        messages: "hai",
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }
    };
    return newMessage;
  };

  addMeAsFriend = chat => {
    this.state.firebaseProfileRef
      .child(`messages/direct/${chat.uid}`)
      .update(this.createMsg(chat));
    let friendsList = [];
    friendsList = chat.friendsList;
    friendsList.push(this.props.user.uid);
    console.log(friendsList);
    this.state.firebaseChatListRef.child(chat.uid).update({ friendsList });
  };

  renderChatList = () => {
    let chatTemplate = [];
    const { chatList } = this.state;
    chatList &&
      this.state.chatList.map((chat,i) => {
        console.log("chat...", chat);
        chatTemplate.push(
          <Menu.Item
              name={chat.receiverId}
              // active={activeItem === "inbox"}
              onClick={this.handleItemClick}
              key={i}
            >
              <Image src={chat.receiverPic} avatar />
              <span>{chat.receiverName}</span>
              {/* <Label color="blue">1</Label> */}
            </Menu.Item>
        )
      });
      return chatTemplate
  };

  renderUserList = () => {
    console.log("renderUserList...");
    let chatTemplate = [];
    const { activeItem, userList } = this.state;
    userList &&
      userList.map((chat, i) => {
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
              {/* <Label color="blue">1</Label> */}
              {this.checkUserIsFriend(chat) === -1 && (
                <Label color="blue">
                  <Button color="blue" onClick={() => this.addMeAsFriend(chat)}>
                    connect
                  </Button>
                </Label>
              )}
            </Menu.Item>
          );
        }
      });
    return chatTemplate;
  };

  render() {
    const { activeItem, searchKey } = this.state;
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
          {searchKey.length === 0
            ? this.renderChatList()
            : this.renderUserList()}
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
