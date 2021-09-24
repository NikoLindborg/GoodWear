import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Text, Card} from 'react-native-elements';
import {RobotoCondensed_400Regular} from '@expo-google-fonts/roboto-condensed';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      style={{alignItems: 'center'}}
      onPress={() => {
        //  navigation.navigate('Single', singleMedia);
        //  TODO: singleitem navigation
      }}
    >
      <Card wrapperStyle={styles.card}>
        <Card.Title style={{fontFamily: 'RobotoCondensed_700Bold'}}>
          {singleMedia.title}
        </Card.Title>
        <Card.Image
          source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
          style={styles.image}
        />
        <Text style={{fontFamily: 'RobotoCondensed_400Regular'}}>
          {singleMedia.description}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
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