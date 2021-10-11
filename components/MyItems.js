import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';

const MyItems = ({navigation}) => {
  const {mediaArray, loadingMedia} = useMedia(true);

  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          loading={loadingMedia}
          navigation={navigation}
          onPress={() => {
            navigation.navigate('SingleItem', {
              filename: item.filename,
              title: item.title,
              description: item.description,
              time_added: item.time_added,
              user_id: item.user_id,
              file_id: item.file_id,
            });
          }}
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
