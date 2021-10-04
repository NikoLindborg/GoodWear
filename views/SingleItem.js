import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Text, Image, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {uploadsUrl} from '../utils/variables';
import {Button} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks/ApiHooks';

const SingleItem = ({route, navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };
  const setChatId = (firstId, secondId) => {
    const chatId =
      Math.min(firstId, secondId) + '_' + Math.max(firstId, secondId);
    return chatId;
  };
  const {filename, title, description, user_id, file_id} = route.params;

  const {getPostTags} = useTag();
  const [postTags, setPostTags] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const allData = JSON.parse(description);

  const getTags = async () => {
    try {
      const tags = await getPostTags(file_id);
      setPostTags(tags);
      setIsLoaded(true);
    } catch (e) {
      console.log('getTags error', e.message);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoaded ? (
        <>
          <View style={styles.item}>
            <Image
              source={{uri: uploadsUrl + filename}}
              style={styles.imageSingle}
            />
            <Text style={fontStyles.boldFont}>{title}</Text>
            <Text style={fontStyles.regularFont}>
              Category: {postTags[1].tag}
            </Text>
            <Text style={fontStyles.regularFont}>
              Condition: {postTags[2].tag}
            </Text>
            <Text style={fontStyles.regularFont}>Size: {postTags[3].tag}</Text>
            <Text style={fontStyles.regularFont}>Price: {postTags[4].tag}</Text>
            <Text style={fontStyles.regularFont}>
              {allData.description}
            </Text>
            <Text style={fontStyles.regularFont}>{allData.shipping}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'Buy item'}
              buttonStyle={styles.buttonRed}
              titleStyle={fontStyles.boldFont}
              onPress={() => {
                navigation.navigate('Chat', {
                  chatId: setChatId(user_id, user.user_id),
                  subject: title,
                  filename: filename,
                });
                //  Toimiva
                //  navigation.navigate('Chat', {owner: user_id, buyer: user.user_id});
                //  TODO: navigate to chat
              }}
            />
            <Button
              buttonStyle={styles.buttonWhite}
              titleStyle={fontStyles.boldBlackFont}
              title={'Offer'}
              onPress={() => {
                logout();
                //  navigation.navigate('Home');
                //  TODO: navigate to chat
              }}
            />
          </View>
        </>
      ) : (
        <View style={styles.item}>
          <Text>Moro</Text>
        </View>
      )}
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
