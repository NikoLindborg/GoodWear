import React from 'react';
import {FlatList} from 'react-native';
import {useFavourite} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';

const MyItems = ({navigation}) => {
  const {favouriteArray} = useFavourite();

  return (
    <FlatList
      data={favouriteArray}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          showButtons={true}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

MyItems.propTypes = {
  navigation: PropTypes.object,
};

export default MyItems;
