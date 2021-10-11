import React, {useCallback, useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {GiftedChat} from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig';

const Chat = (chatUserIds) => {
  const {user} = useContext(MainContext);
  const chatId = chatUserIds.route.params.chatId;
  const productTitle = chatUserIds.route.params.subject;
  const chatAvatar = chatUserIds.route.params.filename;
  const buyer = chatUserIds.route.params.buyer;
  const lastMessage = new Date();

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const chatsRef = db
    .collection('chats')
    .doc(chatId)
    .collection('chatmessages');

  db.collection('chats').doc(chatId).update({
    read: true,
    readBy: user.username,
  });

  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setChatUser({
      _id: user.user_id,
      name: user.username,
      avatar: require('../assets/images/avatar.png'),
    });
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          return {...message, createdAt: message.createdAt.toDate()};
        })
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
    db.collection('chats').doc(chatId).set({
      chatId,
      subject: productTitle,
      avatar: chatAvatar,
      lastMessage: lastMessage,
      read: false,
      sentBy: user.username,
      readBy: user.username,
      buyer: buyer,
    });
  };

  return <GiftedChat messages={messages} user={chatUser} onSend={handleSend} />;
};

Chat.propTypes = {
  navigation: PropTypes.object,
};

export default Chat;
