import React from 'react';
import PropTypes from 'prop-types';
import {Text, Image, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {uploadsUrl} from '../utils/variables';
import {Button} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';

const SingleItem = ({route, navigation}) => {
  const {filename, title, description} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Image
          source={{uri: uploadsUrl + filename}}
          style={styles.imageSingle}
        />
        <Text style={fontStyles.boldFont}>{title}</Text>
        <Text style={fontStyles.regularFont}>{description}</Text>
        <Text style={fontStyles.regularFont}>{description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Buy item'}
          buttonStyle={styles.buttonRed}
          titleStyle={fontStyles.boldFont}
          onPress={() => {
            navigation.navigate('Home');
            //  TODO: navigate to chat
          }}
        />
        <Button
          buttonStyle={styles.buttonWhite}
          titleStyle={fontStyles.boldBlackFont}
          title={'Offer'}
          onPress={() => {
            navigation.navigate('Home');
            //  TODO: navigate to chat
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageSingle: {
    width: 200,
    height: 300,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonRed: {
    width: 100,
    backgroundColor: '#E07A5F',
  },
  buttonWhite: {
    width: 100,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
});

SingleItem.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default SingleItem;
