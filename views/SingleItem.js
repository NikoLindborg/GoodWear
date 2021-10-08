import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Text, Image, View, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {uploadsUrl} from '../utils/variables';
import {Button} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useFavourite, useTag} from '../hooks/ApiHooks';

const SingleItem = ({route, navigation}) => {
  const {setIsLoggedIn, user, updateFavourite, setUpdateFavourite} =
    useContext(MainContext);
  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };
  const setChatId = (firstId, secondId) => {
    const chatId =
      Math.min(firstId, secondId) + '_' + Math.max(firstId, secondId);
    return chatId;
  };
  const {filename, title, description, user_id, file_id} = route.params;

  const {getPostTags} = useTag();
  const [postTags, setPostTags] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const allData = JSON.parse(description);

  const getTags = async () => {
    try {
      const tags = await getPostTags(file_id);
      setPostTags(tags);
      setIsLoaded(true);
    } catch (e) {
      console.log('getTags error', e.message);
    }
  };

  const [favourite, setFavourite] = useState(false);
  const {addFavourite, deleteFavourite} = useFavourite();
  const {loadFavourites} = useFavourite();

  const saveItem = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await addFavourite(file_id, userToken);
      if (result) {
        setFavourite(true);
        setUpdateFavourite(updateFavourite + 1);
      }
      return result;
    } catch (e) {
      console.log(e.message);
    }
  };

  const removeSavedItem = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await deleteFavourite(file_id, userToken);
      if (result) {
        setFavourite(false);
      }
      return result;
    } catch (e) {
      console.log(e.message);
    }
  };

  const getFavourites = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const favouriteArray = await loadFavourites(userToken);
      if (favouriteArray) {
        favouriteArray.forEach((favourite) => {
          if (favourite.file_id === file_id) {
            setFavourite(true);
          }
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const [isMyItem, setIsMyItem] = useState(false);

  const deleteItem = async () => {};

  const modifyItem = async () => {};

  useEffect(() => {
    getTags();
    getFavourites();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoaded ? (
        <>
          <View style={styles.item}>
            {favourite ? (
              <Button
                buttonStyle={styles.buttonWhite}
                containerStyle={{
                  position: 'absolute',
                  top: 20,
                  right: 70,
                  zIndex: 1,
                }}
                titleStyle={fontStyles.boldBlackFont}
                title={'Remove'}
                onPress={() => {
                  removeSavedItem();
                }}
              />
            ) : (
              <Button
                buttonStyle={styles.buttonWhite}
                containerStyle={{
                  position: 'absolute',
                  top: 20,
                  right: 70,
                  zIndex: 1,
                }}
                titleStyle={fontStyles.boldBlackFont}
                title={'Save'}
                onPress={() => {
                  saveItem();
                }}
              />
            )}

            <Image
              source={{uri: uploadsUrl + filename}}
              style={styles.imageSingle}
            />
            <Text style={fontStyles.boldFont}>{title}</Text>
            <Text style={fontStyles.regularFont}>
              Category: {postTags[1].tag}
            </Text>
            <Text style={fontStyles.regularFont}>
              Condition: {postTags[2].tag}
            </Text>
            <Text style={fontStyles.regularFont}>Size: {postTags[3].tag}</Text>
            <Text style={fontStyles.regularFont}>Price: {postTags[4].tag}</Text>
            <Text style={fontStyles.regularFont}>{allData.description}</Text>
            <Text style={fontStyles.regularFont}>{allData.shipping}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {isMyItem ? (
              <>
                <Button
                  title={'Modify item'}
                  buttonStyle={styles.buttonRed}
                  titleStyle={fontStyles.boldFont}
                  onPress={() => {
                    modifyItem();
                  }}
                />
                <Button
                  title={'Delete item'}
                  buttonStyle={styles.buttonRed}
                  titleStyle={fontStyles.boldFont}
                  onPress={() => {}}
                />
              </>
            ) : (
              <>
                <Button
                  title={'Buy item'}
                  buttonStyle={styles.buttonRed}
                  titleStyle={fontStyles.boldFont}
                  onPress={() => {
                    navigation.navigate('Chat', {
                      chatId: setChatId(user_id, user.user_id),
                      subject: title,
                      filename: filename,
                    });
                    //  Toimiva
                    //  navigation.navigate('Chat', {owner: user_id, buyer: user.user_id});
                    //  TODO: navigate to chat
                  }}
                />
                <Button
                  buttonStyle={styles.buttonWhite}
                  titleStyle={fontStyles.boldBlackFont}
                  title={'Offer'}
                  onPress={() => {
                    logout();
                    //  navigation.navigate('Home');
                    //  TODO: navigate to chat
                  }}
                />
              </>
            )}
          </View>
        </>
      ) : (
        <View style={styles.item}>
          <Text>Moro</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageSingle: {
    width: 200,
    height: 300,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonRed: {
    width: 100,
    backgroundColor: '#E07A5F',
  },
  buttonWhite: {
    width: 100,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
});

SingleItem.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default SingleItem;
