import React, {useCallback, useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import firebase from 'firebase';
import 'firebase/auth';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {firebaseConfig} from '../firebaseConfig';
import {useIsFocused} from '@react-navigation/native';
import fontStyles from '../utils/fontStyles';

const Messages = ({navigation}) => {
  const {user, setUnreadMessages, isLoggedIn, setAskLogin} =
    useContext(MainContext);
  const isFocused = useIsFocused();
  const [isLoaded, setIsLoaded] = useState(false);

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const chatsRef = db.collection('chats');

  const emptyArray = [];
  const emptyArrayTwo = [];
  const [messagesArray, setMessagesArray] = useState([]);

  const checkConversations = () => {
    emptyArrayTwo.splice(0, emptyArray.length);
    chatsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id.includes(user.user_id)) {
          //  emptyArray.push(doc.get("chatId"));
          emptyArray.push(doc.data());
          emptyArray.sort((a, b) => b.lastMessage - a.lastMessage);
          const item = doc.data();
          if (
            (item.read === false &&
              item.sentBy !== user.username &&
              item.readBy !== user.username) ||
            (item.read === true &&
              item.sentBy !== user.username &&
              item.readBy !== user.username)
          ) {
            if (!emptyArrayTwo.includes(item.chatId)) {
              emptyArrayTwo.push(item.chatId);
            }
          }
        }
      });
      setUnreadMessages(emptyArrayTwo);
      setMessagesArray(emptyArray);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    (() => {
      checkConversations();
    })();
  }, [isFocused]);

  return (
    <SafeAreaView>
      {!isLoggedIn ? (
        <View style={styles.introBox}>
          <Text style={styles.headerFont}>
            {'\n'}Hello!{'\n'}
          </Text>
          <Text style={fontStyles.regularFontCenter}>
            As a non registered user, you can only browse items{'\n'}
          </Text>
          <Text style={fontStyles.regularFontCenter}>
            You can go back to login screen by clicking the button down below
            {'\n'}
          </Text>
          <Button
            buttonStyle={styles.buttonWhite}
            titleStyle={fontStyles.boldBlackFont}
            title={'Go back to login'}
            onPress={() => {
              setAskLogin(false);
            }}
          />
        </View>
      ) : isLoaded ? (
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
                  buyer: item.buyer,
                })
              }
            >
              <ListItem style={styles.listItem}>
                <Avatar
                  source={{uri: uploadsUrl + item.avatar}}
                  avatarStyle={{borderRadius: 50, flex: 9}}
                />
                {(item.read === false &&
                  item.sentBy !== user.username &&
                  item.readBy !== user.username) ||
                (item.read === true &&
                  item.sentBy !== user.username &&
                  item.readBy !== user.username) ? (
                  <>
                    <View style={styles.conversation}>
                      <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        {item.subject}
                      </Text>
                      <Text style={{fontWeight: 'bold', fontSize: 14}}>
                        Buyer: {item.buyer}
                      </Text>
                    </View>
                    <View style={styles.notification} />
                  </>
                ) : (
                  <>
                    <View style={styles.conversation}>
                      <Text style={{fontSize: 16}}>{item.subject}</Text>
                      <Text style={{fontSize: 14}}>Buyer: {item.buyer}</Text>
                    </View>
                  </>
                )}
              </ListItem>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

Messages.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: 'grey',
    borderStyle: 'dashed',
  },
  conversation: {
    flexDirection: 'column',
  },
  notification: {
    backgroundColor: '#E07A5F',
    width: 10,
    height: 10,
    marginLeft: 10,
    borderRadius: 50,
  },
  introBox: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonWhite: {
    marginTop: 5,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
});

export default Messages;
