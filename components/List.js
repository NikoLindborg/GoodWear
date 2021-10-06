import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import {MainContext} from '../contexts/MainContext';

const List = ({navigation, isHorizontal, data}) => {
  console.log('daatta', data)
  return (
    <FlatList
      data={data}
      style={{alignItems: 'center'}}
      keyExtractor={(item, index) => index.toString()}
      horizontal={isHorizontal}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  isHorizontal: PropTypes.bool,
  data: PropTypes.array,
};

export default List;
