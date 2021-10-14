/**
 * Js-file for Messages view
 *
 * View for getting chat messages in a conversation that the user has opened in Messages View.
 *
 * React Native Gifted Chat used for the user interface.
 *
 * @author Aleksi Kosonen, Niko Lindborg & Aleksi Kytö
 *
 **/

import React, {useCallback, useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig';

const Chat = (chatUserIds) => {
  const {user, setChatSubject} = useContext(MainContext);
  const chatId = chatUserIds.route.params.chatId;
  const productTitle = chatUserIds.route.params.subject;
  const chatAvatar = chatUserIds.route.params.filename;
  const buyer = chatUserIds.route.params.buyer;
  const lastMessage = new Date();

  //  If Firebase.apps already contains an app it doesn't initialize a new one
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  //  Variable for the getting the right subcollection from Firebase based on the given chatId
  const db = firebase.firestore();
  const chatsRef = db
    .collection('chats')
    .doc(chatId)
    .collection('chatmessages');

  //  Sets the collections fields properties to implicate that the message is read
  db.collection('chats').doc(chatId).update({
    read: true,
    readBy: user.username,
  });

  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState([]);

  //  UseEffect to get new messages in subcollection and order them from oldest to newest
  useEffect(() => {
    setChatSubject(productTitle);
    setChatUser({
      _id: user.user_id,
      name: user.username,
      avatar: require('../assets/images/user.png'),
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

  //  CallBack function to append new and old messages to messages state
  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  //  Functions that sends the message and set's the document fields to match the sender
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

  return (
    <GiftedChat
      messages={messages}
      user={chatUser}
      onSend={handleSend}
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#E07A5F',
              },
            }}
          />
        );
      }}
    />
  );
};

Chat.propTypes = {
  navigation: PropTypes.object,
};

export default Chat;
