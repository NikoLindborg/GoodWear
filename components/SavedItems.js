import React, {useState, useEffect, useContext} from 'react';
import {FlatList} from 'react-native';
import {useFavourite} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const SavedItems = ({navigation}) => {
  const {loadFavourites} = useFavourite();
  const {mediaArray, updateFavourite} = useContext(MainContext);
  const [savedItems, setSavedItems] = useState();
  const [loading, setLoading] = useState();
  const newMediaArray = [];

  const loadFavs = async () => {
    setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const favouriteArray = await loadFavourites(userToken);
      if (favouriteArray) {
        favouriteArray.forEach((favourite) => {
          mediaArray.forEach((media) => {
            console.log(media)
            if (favourite.file_id === media.file_id) {
              newMediaArray.push(media);
            }
          });
        });
        setSavedItems(newMediaArray);
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
    <FlatList
      data={savedItems}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          loading={loading}
        />
      )}
    />
  );
};

SavedItems.propTypes = {
  navigation: PropTypes.object,
};

export default SavedItems;
