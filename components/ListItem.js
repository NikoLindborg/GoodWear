import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Text, Card} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';
import {MainContext} from '../contexts/MainContext';

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
          <Text style={fontStyles.boldFont}>{singleMedia.title}</Text>
          <Card.Image
            source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={2} style={fontStyles.regularFontCenter}>
              {JSON.parse(singleMedia.description).description}
            </Text>
            {!JSON.parse(singleMedia.description).price.endsWith('€') ? (
              <Text style={fontStyles.regularFont}>
                {JSON.parse(singleMedia.description).price}€
              </Text>
            ) : (
              <Text style={fontStyles.regularFont}>
                {JSON.parse(singleMedia.description).price}
              </Text>
            )}
          </View>
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
    flexDirection: 'row',
    width: 180,
    height: 'auto',
    alignSelf: 'center',
    resizeMode: 'contain',
    aspectRatio: 4 / 3,
  },
  card: {
    alignItems: 'center',
    height: 250,
    width: 200,
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'center',
  },
});

export default ListItem;
