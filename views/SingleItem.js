/**
 * Js-file for SingleItem view
 *
 * View for Single Item. The view shows selected item and let's you favourite and start a chat with product's seller.
 *
 * View also provides tags for set item and if item is logged in user's own, user is able to modify or delete it
 *
 * @author Aleksi Kosonen, Niko Lindborg & Aleksi Kytö
 *
 **/

import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {Button, Icon} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useFavourite, useMedia, useTag} from '../hooks/ApiHooks';

const SingleItem = ({route, navigation}) => {
  const {
    user,
    updateFavourite,
    setUpdateFavourite,
    isLoggedIn,
    update,
    setUpdate,
  } = useContext(MainContext);

  //  Function for generating a unique chatId to Firebase based on users userId:s
  const setChatId = (firstId, secondId) => {
    const chatId =
      Math.min(firstId, secondId) + '_' + Math.max(firstId, secondId);
    return chatId;
  };
  const {filename, title, description, user_id, file_id} = route.params;

  const {getPostTags} = useTag();
  const [postTags, setPostTags] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMyItem, setIsMyItem] = useState(false);
  const {deleteMedia} = useMedia();
  const [showBox, setShowBox] = useState(true);
  const allData = JSON.parse(description);
  const singleItemFont = fontStyles.regularFont;

  //  Fetching post's tags based on file_id
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

  //  Adding item to favourites
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

  //  Remove item from favourites
  const removeSavedItem = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await deleteFavourite(file_id, userToken);
      if (result) {
        setFavourite(false);
        setUpdateFavourite(updateFavourite + 1);
      }
      return result;
    } catch (e) {
      console.log(e.message);
    }
  };

  //  Fetch all favorites where file_id is the same as posts file_id
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

  const checkIfMyItem = () => {
    if (user_id) {
      if (user.user_id === user_id) {
        setIsMyItem(true);
      }
    }
  };

  //  Delete items that are user's own. Also alert user before deleting
  const deleteItem = async () => {
    Alert.alert('Delete post?', 'Are you sure you want to delete this post?', [
      {
        text: 'Yes',
        onPress: async () => {
          setShowBox(false);
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(file_id, token);
            console.log('Delete', response);
            if (response.message) {
              setUpdate(update + 1);
              navigation.navigate('Profile');
            }
          } catch (e) {
            console.log('ListItem, delete: ', e.message);
          }
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const singleMedia = route.params;

  useEffect(() => {
    getTags();
    getFavourites();
    checkIfMyItem();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        {isLoaded ? (
          <>
            <View style={styles.item}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: uploadsUrl + filename}}
                  style={styles.imageSingle}
                />
              </View>
              {isMyItem ? (
                <>
                  <View style={styles.imageContainerBottom}>
                    <Text style={fontStyles.bigBoldFont24}>{title}</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.imageContainerBottom}>
                    <Text style={fontStyles.bigBoldFont24}>{title}</Text>
                    {favourite ? (
                      <Button
                        buttonStyle={{backgroundColor: 'white'}}
                        onPress={() => {
                          removeSavedItem();
                        }}
                        icon={
                          <Icon
                            name="heart"
                            type="font-awesome"
                            size={35}
                            color={'red'}
                          />
                        }
                      />
                    ) : (
                      <Button
                        buttonStyle={{backgroundColor: 'white'}}
                        onPress={() => {
                          saveItem();
                        }}
                        icon={
                          <Icon
                            name="heart-o"
                            type="font-awesome"
                            size={35}
                            color={'black'}
                          />
                        }
                      />
                    )}
                  </View>
                </>
              )}

              {/* Here the posts tags are used to check whether the post's gender is unisex and tags are displayed correclty*/}
              <View style={styles.productInfo}>
                {postTags.length < 6 ? (
                  <>
                    <View style={styles.row}>
                      <Text style={singleItemFont}>Category</Text>
                      <Text style={singleItemFont}>{postTags[1].tag}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={singleItemFont}>Condition</Text>
                      <Text style={singleItemFont}>{postTags[2].tag}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={singleItemFont}>Size</Text>
                      <Text style={singleItemFont}>{postTags[3].tag}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={singleItemFont}>Gender</Text>
                      <Text style={singleItemFont}>{postTags[4].tag}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.row}>
                      <Text style={singleItemFont}>Category</Text>
                      <Text style={singleItemFont}>{postTags[1].tag}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={singleItemFont}>Condition</Text>
                      <Text style={singleItemFont}>{postTags[2].tag}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={singleItemFont}>Size</Text>
                      <Text style={singleItemFont}>{postTags[3].tag}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={singleItemFont}>Gender</Text>
                      <Text style={singleItemFont}>Unisex</Text>
                    </View>
                  </>
                )}
                <View style={styles.space} />
                <Text style={singleItemFont}>{allData.description}</Text>
                <View style={styles.space} />
                <Text style={singleItemFont}>Shipping: {allData.shipping}</Text>
                <View style={styles.space} />
                {!JSON.parse(description).price.endsWith('€') ? (
                  <Text style={fontStyles.bigBoldFont24}>
                    {JSON.parse(description).price}€
                  </Text>
                ) : (
                  <Text style={fontStyles.bigBoldFont24}>
                    {JSON.parse(description).price}
                  </Text>
                )}
                <View style={styles.space} />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.item}>
              <ActivityIndicator />
            </View>
          </>
        )}
        <View style={styles.empty} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        {isMyItem ? (
          <>
            <Button
              title={'Modify item'}
              buttonStyle={styles.buttonRed}
              titleStyle={fontStyles.boldFont}
              onPress={() => {
                navigation.navigate('Modify', {
                  singleMedia,
                  navigation,
                });
              }}
            />
            <Button
              title={'Delete item'}
              buttonStyle={styles.buttonRed}
              titleStyle={fontStyles.boldFont}
              onPress={() => {
                deleteItem();
              }}
            />
          </>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title={'Send message to seller'}
              buttonStyle={styles.buttonRed}
              titleStyle={fontStyles.boldFont}
              onPress={() => {
                !isLoggedIn
                  ? navigation.navigate('NotLoggedInScreen')
                  : navigation.navigate('Chat', {
                      chatId: setChatId(user_id, user.user_id),
                      subject: title,
                      filename: filename,
                      buyer: user.username,
                    });
              }}
            />
          </View>
        )}
        <View style={styles.space} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageSingle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#F0F0F0',
  },
  imageContainerBottom: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    height: 15,
  },
  empty: {
    height: 300,
  },
  productInfo: {
    width: '90%',
    marginTop: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flex: 0,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonRed: {
    width: 250,
    backgroundColor: '#E07A5F',
  },
  buttonWhite: {
    width: 100,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
    display: 'none',
  },
});

SingleItem.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default SingleItem;
