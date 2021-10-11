import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Text, Card} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';

const ListItem = ({singleMedia, navigation, loading}) => {
  return (
    <TouchableOpacity
      style={{alignItems: 'center'}}
      navigation={navigation}
      onPress={() => {
        navigation.navigate('SingleItem', {
          filename: singleMedia.filename,
          title: singleMedia.title,
          description: singleMedia.description,
          time_added: singleMedia.time_added,
          user_id: singleMedia.user_id,
          file_id: singleMedia.file_id,
        });
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Card wrapperStyle={styles.card}>
          <Card.Title style={{fontFamily: 'RobotoCondensed_700Bold'}}>
            {singleMedia.title}
          </Card.Title>
          <Card.Image
            source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
            style={styles.image}
          />
          <Text style={{fontFamily: 'RobotoCondensed_400Regular'}}>
            {JSON.parse(singleMedia.description).description}
          </Text>
          {!JSON.parse(singleMedia.description).price.endsWith('€') ? (
            <Text style={fontStyles.regularFont}>
              Price: {JSON.parse(singleMedia.description).price}€
            </Text>
          ) : (
            <Text style={fontStyles.regularFont}>
              Price: {JSON.parse(singleMedia.description).price}
            </Text>
          )}
        </Card>
      )}
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  loading: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: undefined,
    aspectRatio: 1,
  },
  card: {
    height: 240,
    alignItems: 'center',
  },
});

export default ListItem;
