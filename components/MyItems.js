import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';

const MyItems = ({navigation}) => {
  const {mediaArray} = useMedia(true);

  return (
    <FlatList
      data={mediaArray.reverse()}
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
