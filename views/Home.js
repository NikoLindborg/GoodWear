import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  ActivityIndicator,
} from 'react-native';
import {Button, Image, Text} from 'react-native-elements';
import List from '../components/List';
import fontStyles from '../utils/fontStyles';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import {useIsFocused} from '@react-navigation/native';
import firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig';

const Home = ({navigation}) => {
  const {
    user,
    setUnreadMessages,
    isLoggedIn,
    setAskLogin,
    newWatchlist,
    setNewWatchlist,
  } = useContext(MainContext);
  const [filteredMediaArray, setFilteredMediaArray] = useState();
  const {loadMedia, loadingMedia, mediaArray} = useMedia();
  const [loadingFilteredArray, setLoadingFilteredArray] = useState();
  const [userFilters, setUserFilters] = useState();
  const [extraFilters, setExtraFilters] = useState([
    'jackets',
    'shoes',
    'hats',
  ]);
  const isFocused = useIsFocused();

  const handleFlteredMediaArray = (filteredList) => {
    const list = [];
    filteredList.forEach((e) => list.push(e));
    const anotherList = [...new Set(list)];
    anotherList.sort((e) => e.file_id);
    setFilteredMediaArray(anotherList);
  };

  const setFilteredArray = async () => {
    if (user.full_name && user.full_name.length > 2) {
      const parsedUserData = JSON.parse(user.full_name);
      setUserFilters(parsedUserData.items);
      const list = [];
      for (let i = 0; i < parsedUserData.items.length; i++) {
        // iterate over every tag that has been found from the users watchlist
        const conditionList = await loadMedia(parsedUserData.items[i]);
        // get a list of posts that match the tag from the backend
        const filteredList = mediaArray.filter((e) => {
          // here we filter the list of posts related to the tags, over the whole list of posts,
          // incase there are posts that have the corresponding tags, but are related to different appID
          return conditionList.some((el) => {
            return el.file_id === e.file_id;
          });
        });
        // then we push the filtered list into an empty array
        filteredList.forEach((e) => list.push(e));
      }
      // once the iterations are done, we give the filled list to the filteredMediaArray state handler
      handleFlteredMediaArray(list);
    }
  };

  useEffect(() => {
    (async () => {
      setFilteredMediaArray();
      setLoadingFilteredArray(true);
      setUserFilters();
      await setFilteredArray();
      setNewWatchlist(false);
      setLoadingFilteredArray(false);
    })();
  }, [newWatchlist]);

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
    <SafeAreaView style={styles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          // eslint-disable-next-line no-undef
          source={require('../assets/GW_graphics_slogan.png')}
          style={styles.topImage}
        />
        {!isLoggedIn ? (
          <View style={styles.introBox}>
            <Text style={fontStyles.bigBoldFont24}>
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
        ) : !userFilters ? (
          <View style={styles.introBox}>
            <Text style={fontStyles.bigBoldFont24}>
              {'\n'}Hello {user.username}!{'\n'}
            </Text>
            <Text style={fontStyles.regularFontCenter}>
              We see you have not added any filters yet, and thats okay.{'\n'}
            </Text>
            <Text style={fontStyles.regularFontCenter}>
              You can edit them from your profile, click the button below{'\n'}
            </Text>
            <Button
              buttonStyle={styles.buttonWhite}
              titleStyle={fontStyles.boldBlackFont}
              title={'Watchlist'}
              onPress={() => {
                navigation.navigate('Settings');
              }}
            />
          </View>
        ) : (
          <View style={styles.postBackground}>
            <View style={styles.textBar}>
              <Text style={fontStyles.bigBoldFont24}>
                Newest in your filtered categories
              </Text>
            </View>
            {!filteredMediaArray && !loadingFilteredArray ? (
              <Text> Looks like there arent any posts with your filters</Text>
            ) : (
              <>
                <List
                  navigation={navigation}
                  isHorizontal={true}
                  data={filteredMediaArray}
                  loading={loadingFilteredArray}
                />
                <Button
                  title={'SHOP MORE'}
                  buttonStyle={styles.shopMore}
                  titleStyle={fontStyles.boldFont}
                  containerStyle={styles.shopMoreContainer}
                  onPress={() => {
                    navigation.navigate('FilteredView', {
                      data: filteredMediaArray,
                    });
                  }}
                />
              </>
            )}
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.postBackground}>
          <View style={styles.textBar}>
            <Text style={fontStyles.bigBoldFont24}>Newest in clothing</Text>
          </View>
          <List
            navigation={navigation}
            isHorizontal={true}
            data={mediaArray}
            loading={loadingMedia}
          />
          <Button
            title={'SHOP MORE'}
            buttonStyle={styles.shopMore}
            titleStyle={fontStyles.boldFont}
            containerStyle={styles.shopMoreContainer}
            onPress={() => {
              navigation.navigate('FilteredView', {data: mediaArray});
            }}
          />
        </View>

        <View style={styles.buttonBackground}>
          <View style={styles.textBarTwo}>
            <Text style={fontStyles.bigBoldFont24}>Top categories</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'More ' + extraFilters[0]}
              buttonStyle={styles.extraButton}
              titleStyle={fontStyles.boldBlackFont}
              onPress={() => {
                navigation.navigate('ProductList', {
                  category: extraFilters[0],
                  data: mediaArray,
                });
              }}
            />
            <Button
              title={'More ' + extraFilters[1]}
              buttonStyle={styles.extraButton}
              titleStyle={fontStyles.boldBlackFont}
              onPress={() => {
                navigation.navigate('ProductList', {
                  category: extraFilters[1],
                  data: mediaArray,
                });
              }}
            />
            <Button
              title={'More ' + extraFilters[2]}
              buttonStyle={styles.extraButton}
              titleStyle={fontStyles.boldBlackFont}
              onPress={() => {
                navigation.navigate('ProductList', {
                  category: extraFilters[2],
                  data: mediaArray,
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: '88%',
    position: 'absolute',
    top: 35,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  textBarTwo: {
    height: 50,
    width: '88%',
    position: 'absolute',
    top: 15,
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
    height: 480,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonBackground: {
    marginTop: 100,
    backgroundColor: '#F4F1DE',
    height: 240,
    width: '100%',
    justifyContent: 'center',
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
  buttonContainer: {
    flex: 1,
    marginTop: 100,
    marginBottom: 50,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  extraButton: {
    width: 120,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  extraButtonContainer: {
    borderRadius: 0,
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
    marginBottom: 50,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    left: 5,
  },
  introBox: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
  },
  divider: {
    margin: 30,
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
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
