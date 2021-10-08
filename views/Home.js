import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, StyleSheet, ScrollView, View} from 'react-native';
import {Button, Image, Text} from 'react-native-elements';
import List from '../components/List';
import fontStyles from '../utils/fontStyles';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import {useIsFocused} from '@react-navigation/native';
import firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig';

const Home = ({navigation}) => {
  const {user, mediaArray, setUnreadMessages} = useContext(MainContext);
  const [userFilters, setUserFilters] = useState();
  const [filteredMediaArray, setFilteredMediaArray] = useState();
  const {loadMedia} = useMedia();
  if (user.full_name && !userFilters) {
    const parsedUserData = JSON.parse(user.full_name);
    setUserFilters(parsedUserData.items);
  }

  if (userFilters && !filteredMediaArray) {
    userFilters.forEach(async (e, i) => {
      const array = await loadMedia(e);
      setFilteredMediaArray(await array);
    });
  }
  console.log('filtered array ', filteredMediaArray);

  const isFocused = useIsFocused();

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const chatsRef = db.collection('chats');
  const emptyArray = [];

  useEffect(() => {
    emptyArray.splice(0, emptyArray.length);
    chatsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id.includes(user.user_id)) {
          const item = doc.data();
          if (
            (item.read === false &&
              item.sentBy !== user.username &&
              item.readBy !== user.username) ||
            (item.read === true &&
              item.sentBy !== user.username &&
              item.readBy !== user.username)
          ) {
            if (!emptyArray.includes(item.chatId)) {
              emptyArray.push(item.chatId);
            }
          }
        }
      });
      setUnreadMessages(emptyArray);
    });
  }, [isFocused]);

  return (
    <ScrollView style={{paddingTop: 0, marginTop: 0}}>
      <SafeAreaView style={styles.droidSafeArea}>
        <Image
          // eslint-disable-next-line no-undef
          source={require('../assets/GW_graphics_slogan.png')}
          style={styles.topImage}
        />
        {!userFilters ? (
          <View style={styles.introBox}>
            <Text style={styles.headerFont}>
              {'\n'}Hello {user.username}!{'\n'}
            </Text>
            <Text style={fontStyles.regularFont}>
              Scroll to find the latest items in Goodwear or add categories that
              you are looking for{'\n'}
            </Text>
            <Text style={fontStyles.regularFont}>
              Edit or add to your watchlist{'\n'}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </SafeAreaView>
      <View style={styles.postBackground}>
        <View style={styles.textBar}>
          <Text style={styles.headerFont}>Newest in clothing</Text>
        </View>
        <List navigation={navigation} isHorizontal={true} data={mediaArray} />
        <Button
          title={'SHOP MORE'}
          buttonStyle={styles.shopMore}
          titleStyle={fontStyles.boldFont}
          containerStyle={styles.shopMoreContainer}
          onPress={() => {
            navigation.navigate('ProductList', {category: 'accessories'});
          }}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.postBackgroundEggshell}>
        <View style={styles.textBarGreen}>
          <Text style={styles.headerFont}>Newest in clothing</Text>
        </View>
        <List
          navigation={navigation}
          isHorizontal={true}
          data={mediaArray.reverse()}
        />
        <Button
          title={'SHOP MORE'}
          buttonStyle={styles.shopMore}
          titleStyle={fontStyles.boldFont}
          containerStyle={styles.shopMoreContainer}
          onPress={() => {
            navigation.navigate('ProductList', {category: 'jackets'});
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textBar: {
    backgroundColor: '#F4F1DE',
    height: 50,
    width: '90%',
    position: 'absolute',
    top: 10,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  textBarGreen: {
    backgroundColor: '#9AC1AE',
    height: 50,
    width: '90%',
    position: 'absolute',
    top: 10,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  postBackground: {
    backgroundColor: '#9AC1AE',
    height: 450,
  },
  postBackgroundEggshell: {
    backgroundColor: '#F4F1DE',
    height: 450,
  },
  shopMore: {
    height: 75,
    alignSelf: 'center',
    backgroundColor: '#E07A5F',
  },
  shopMoreContainer: {
    borderRadius: 0,
    backgroundColor: '#E07A5F',
    alignSelf: 'center',
    width: '50%',
    position: 'absolute',
    zIndex: 1,
    bottom: -40,
  },
  topImage: {
    marginTop: 50,
    width: 400,
    height: 100,
    resizeMode: 'contain',
  },
  introBox: {
    alignSelf: 'center',
    padding: 10,
  },
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
  divider: {
    margin: 50,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
