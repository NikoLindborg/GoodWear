import React, {useCallback, useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {GiftedChat} from 'react-native-gifted-chat';
import {baseUrl, uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/auth';
import {FlatList, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';

const Messages = ({navigation}) => {
  const {user} = useContext(MainContext);

 

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const chatsRef = db.collection('chats');

  const [chatUser, setChatUser] = useState();
  const [messages, setMessages] = useState([]);

  /*  const conversationArray = [];
  const myConvos = [];

  const checkIfMyChat = (array) => {
    array.filter((item) => {
      if (item.chatId.includes(user.user_id)) {
        myConvos.push(item);
      }
    });
  };

  chatsRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      conversationArray.push(doc.data());
    });
    checkIfMyChat(conversationArray);
  });*/

  useEffect(() => {
    setChatUser({
      _id: user.user_id,
      name: user.username,
      avatar: require('../assets/images/avatar.png'),
    });
    const unsubscribe = chatsRef
      //  .where('user.sentTo', '==', user.user_id)
      //  .where('user.sentTo', 'array-contains', user.user_id)
      .onSnapshot((querySnapshot) => {
        const messagesFirestore = querySnapshot
          .docChanges()
          .filter(({type}) => type === 'added')
          .map(({doc}) => {
            const message = doc.data();
            if (message.chatId.includes(user.user_id)) {
              return {...message};
            } else {
              return {};
            }
          });
        appendMessages(
          messagesFirestore.filter(
            (message) => JSON.stringify(message) !== '{}'
          )
        );
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

  const arrayUniqueByKey = [
    ...new Map(messages.map((item) => [item.chatId, item])).values(),
  ];

  return (
    <SafeAreaView>
      <FlatList
        data={arrayUniqueByKey}
        keyExtractor={(item) => item.chatId}
        renderItem={({item}) => (
          <TouchableOpacity
            //  onPress={() => navigation.navigate('Chat', {owner: item.user._id})}
            onPress={() =>
              navigation.navigate('Chat', {
                chatId: item.chatId,
                subject: item.subject,
                filename: item.avatar,
              })
            }
          >
            <ListItem>
              <Avatar
                source={{uri: uploadsUrl + item.avatar}}
                avatarStyle={{borderRadius: 50}}
              />
              <Text>{item.subject}</Text>
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

Messages.propTypes = {
  navigation: PropTypes.object,
};

export default Messages;
