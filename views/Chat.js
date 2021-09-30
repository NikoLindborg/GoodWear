import React, {useCallback, useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {GiftedChat} from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import firebase from 'firebase';

const Chat = (chatUserIds) => {
  const {user} = useContext(MainContext);
  const chatId = chatUserIds.route.params.chatId;
  const productTitle = chatUserIds.route.params.subject;
  const chatAvatar = chatUserIds.route.params.filename;



  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  //const sentToUserId = sentToUser.route.params.owner;
  //const sentByUserId = sentToUser.route.params.buyer;

  //  const chatId = sentByUserId + '_' + sentByUserId;
  //  console.log('chattiId', chatId);

  const db = firebase.firestore();
  //  Toimiva
  //  const chatsRef = db.collection('chats');
  const chatsRef = db
    .collection('chats')
    .doc(chatId)
    .collection('chatmessages');

  const username = user.username;

  db.collection('chats').doc(chatId).set({
    chatId,
    subject: productTitle,
    avatar: chatAvatar,
  });
  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState([]);

  //  Sub-collection for chat's
  /*  const chatsRef = db
    .collection('chats')
    .doc('chatId')
    .collection('chatmessages');
  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState([]);

  db.collection('chats')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
      });
    });

  db.collection('chats')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('submessage', doc.id);
      });
    });*/

  useEffect(() => {
    setChatUser({
      _id: user.user_id,
      name: user.username,
      avatar: require('../assets/images/avatar.png'),
      //sentTo: sentToUserId,
    });
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          return {...message, createdAt: message.createdAt.toDate()};
        })
        //toimiva
        /*  .filter(
            (item) =>
              (item.user._id === sentToUserId &&
                item.user.sentTo === user.user_id) ||
              (item.user._id === user.user_id &&
                item.user.sentTo === sentToUserId)
          )*/
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const handleSend = async (messages) => {
    const writer = messages.map((m) => chatsRef.add(m));
    await Promise.all(writer);
  };

  return <GiftedChat messages={messages} user={chatUser} onSend={handleSend} />;
};

Chat.propTypes = {
  navigation: PropTypes.object,
};

export default Chat;
