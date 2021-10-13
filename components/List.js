import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = ({navigation, isHorizontal, data, loading}) => {
  return (
    <FlatList
      data={data}
      style={{alignItems: 'center'}}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal={isHorizontal}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          singleMedia={item}
          loading={loading}
        />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  isHorizontal: PropTypes.bool,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default List;
