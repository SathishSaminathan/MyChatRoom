import React, { Component } from "react";
import { Input, Label, Menu, Image, Button } from "semantic-ui-react";
import _ from "lodash";

import { connect } from "react-redux";
import firebase from "../../config/firebase";
import "./ChatList.css";

class ChatList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeItem: "inbox",
    firebaseChatListRef: firebase.database().ref("users"),
    firebaseProfileRef: firebase.database(),
    messagesRef: firebase.database().ref("messages"),
    presenceRef: firebase.database().ref("presence"),
    chatList: [],
    chatTemplate: [],
    searchKey: "",
    userList: [],
    key: null,
    searchLoading: false,
    presenceList: []
  };

  componentDidMount() {
    this.chatListListener();
    this.presenceListener();
  }

  presenceListener = () => {
    let presenceList = [];
    this.state.presenceRef.on("child_added", snapshot => {
      presenceList.push(snapshot.val());
      console.log("console beffore push", this.state.presenceList);
      this.setState({ presenceList }, () =>
        console.log("child_added state data...", this.state.presenceList)
      );
    });
    this.state.presenceRef.on("child_removed", snapshot => {
      let remove = snapshot.val();
      let filter = presenceList.filter(presenceList => {
        return presenceList.uid !== remove.uid;
      });
      this.setState({ presenceList: filter });
      console.log(" child_removed state data...", this.state.presenceList);
    });
  };

  handleChange = _.debounce(e => {
    console.log(this.state.searchKey);
    this.setState(
      {
        searchKey: e.target.value,
        searchLoading: false
      },
      () => this.searchChatList()
    );
  }, 1500);

  // getTheUserList = () => {
  //   const { firebaseProfileRef } = this.state;
  //   firebaseProfileRef
  //     .ref(this.props.user.uid)
  //     .child("messages/direct")
  //     .on("child_added", snapshot => {});
  // };

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
        .orderByChild("displayName")
        // .startAt(`${searchKey}`)
        // .endAt(`${searchKey}\uf8ff`)
        .equalTo(`${searchKey}`)
        .on("child_added", snapshot => {
          let chat = snapshot.val();
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
    firebaseProfileRef
      .ref(this.props.user.uid)
      .child("messages/direct")
      .on("child_added", snapshot => {
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

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }, () =>
      console.log("item Clicked!!!", name)
    );
    this.props.activeMessage(name);
  };

  checkUserIsFriend = chat => {
    return chat.friendsList.indexOf(this.props.user.uid);
  };

  createMsg = (chat, message, key) => {
    const { firebaseProfileRef } = this.state;
    const { user } = this.props;
    let newMessage = null;

    this.setState({ key }, console.log("this.state.key", this.state.key));
    if (message === "ownMessage") {
      newMessage = {
        receiverName: chat.displayName,
        receiverId: chat.uid,
        receiverPic: chat.photoURL,
        key: key,
        senderDetails: {
          senderId: user.uid,
          senderName: user.displayName,
          senderPic: user.photoURL,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }
      };
    } else {
      newMessage = {
        receiverName: user.displayName,
        receiverId: user.uid,
        receiverPic: user.photoURL,
        key: key,
        senderDetails: {
          senderId: chat.uid,
          senderName: chat.displayName,
          senderPic: chat.photoURL,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }
      };
    }

    return newMessage;
  };

  addMeAsFriend = chat => {
    const { messagesRef, firebaseProfileRef } = this.state;
    const key = firebaseProfileRef.ref(this.props.user.uid).push().key;
    firebaseProfileRef
      .ref(this.props.user.uid)
      .child(`messages/direct/${chat.uid}`)
      .update(this.createMsg(chat, "ownMessage", key));

    firebaseProfileRef
      .ref(chat.uid)
      .child(`messages/direct/${this.props.user.uid}`)
      .update(this.createMsg(chat, "", key));

    // messagesRef.push(key).set({ message: "hai" });
    let friendsList = [];
    friendsList = chat.friendsList;
    friendsList.push(this.props.user.uid);
    this.state.firebaseChatListRef.child(chat.uid).update({ friendsList });
    
    this.setState({ searchKey: "" });
  };

  renderChatList = () => {
    let chatTemplate = [];
    const { chatList, activeItem } = this.state;

    const createObj = (uid, status) => {
      return {
        uid: uid,
        status: status
      };
    };

    const statusRef = this.state.presenceRef.child(this.props.user.uid);
    statusRef.set(createObj(this.props.user.uid, true));
    // statusRef.onDisconnect().set(createObj(this.props.user.uid, false));
    statusRef.onDisconnect().remove();

    chatList &&
      this.state.chatList.map((chat, i) => {
        // console.log("chat...", chat);
        // let obj = this.state.presenceList.find(x => x.uid === chat.receiverId);
        // let index = this.state.presenceList.indexOf(obj);
        // // let status=false
        // // if(index===1){
        // //   this.state.presenceList[index]
        // // }
        // console.log("obj...", obj);
        // console.log("index...", index);
        let found = this.state.presenceList.filter(
          presenceList => presenceList.uid === chat.receiverId
        );
        console.log("found...", found.length);
        chatTemplate.push(
          <Menu.Item
            name={chat.key}
            active={activeItem === chat.key}
            onClick={this.handleItemClick}
            key={i}
          >
            <div className="avatar">
              <Image src={chat.receiverPic} avatar />
              <span className={`status ${found.length >= 1 && "active"}`} />
            </div>
            <span>{chat.receiverName}</span>
            {/* {index === 1 && <Label color="blue">1</Label>} */}
          </Menu.Item>
        );
      });
    return chatTemplate;
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
              <Image src={chat.photoURL} avatar />
              <span>{chat.displayName}</span>
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
    const { activeItem, searchKey, searchLoading } = this.state;
    return (
      <React.Fragment>
        <Menu vertical size="massive" fluid>
          <Menu.Item>
            <Input
              icon="search"
              placeholder="Search contact..."
              onChange={e => {
                e.persist();
                this.handleChange(e);
                this.setState({
                  searchKey: e.target.value,
                  searchLoading: true
                });
              }}
              value={searchKey}
              loading={searchLoading}
            />
          </Menu.Item>
          {searchKey.length === 0
            ? this.renderChatList()
            : this.renderUserList()}
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
