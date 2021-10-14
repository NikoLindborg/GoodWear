/**
 * Js-file for saved items view
 *
 *
 * Loads list of uploaded media and filters 'saved' media into list.
 * Use new list of favourites as data for List view
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */
import React, {useState, useEffect, useContext} from 'react';
import {FlatList} from 'react-native';
import {useFavourite, useMedia} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import List from './List';

const SavedItems = ({navigation}) => {
  const {loadFavourites} = useFavourite();
  const {mediaArray, updateFavourite} = useContext(MainContext);
  const [savedItems, setSavedItems] = useState();
  const [loading, setLoading] = useState();
  const {loadingMedia} = useMedia();
  const newMediaArray = [];

  const loadFavs = async () => {
    setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const favouriteArray = await loadFavourites(userToken);
      if (favouriteArray) {
        favouriteArray.forEach((favourite) => {
          mediaArray.forEach((media) => {
            if (favourite.file_id === media.file_id) {
              newMediaArray.push(media);
            }
          });
        });
        setSavedItems(newMediaArray.reverse());
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadFavs();
    })();
  }, [updateFavourite]);

  return (
    <List
      navigation={navigation}
      isHorizontal={false}
      data={savedItems}
      loading={loadingMedia}
    />
  );
};

SavedItems.propTypes = {
  navigation: PropTypes.object,
};

export default SavedItems;
