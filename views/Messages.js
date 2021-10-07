import React, {useCallback, useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/auth';
import {FlatList, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {firebaseConfig} from '../firebaseConfig';
import {useIsFocused} from '@react-navigation/native';

const Messages = ({navigation}) => {
  const {user} = useContext(MainContext);
  const isFocused = useIsFocused();

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const chatsRef = db.collection('chats');

  const emptyArray = [];
  const [messagesArray, setMessagesArray] = useState([]);

  useEffect(() => {
    (() => {
      chatsRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id.includes(user.user_id)) {
            //  emptyArray.push(doc.get("chatId"));
            emptyArray.push(doc.data());
            emptyArray.sort((a, b) => b.lastMessage - a.lastMessage);
          }
          setMessagesArray(emptyArray);
        });
      });
    })();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <FlatList
        data={messagesArray}
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
              {(item.read === false &&
                item.sentBy !== user.username &&
                item.readBy !== user.username) ||
              (item.read === true &&
                item.sentBy !== user.username &&
                item.readBy !== user.username) ? (
                <>
                  <Text style={{fontWeight: 'bold'}}>
                    Product: {item.subject} Buyer: {item.sentBy}
                  </Text>
                </>
              ) : (
                <>
                  <Text>
                    Product: {item.subject} Buyer: {item.sentBy}
                  </Text>
                </>
              )}
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
