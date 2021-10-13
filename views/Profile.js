import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, Text, View, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import MyItems from '../components/MyItems';
import SavedItems from '../components/SavedItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import fontStyles from '../utils/fontStyles';

const Profile = ({navigation}) => {
  const [selectedView, setSelectedView] = useState(false);
  const {user, setUser, isLoggedIn, setAskLogin, update, updateUser} =
    useContext(MainContext);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
        }
      } catch (e) {
        console.log('getToken profile', e);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await getToken();
    })();
  }, [update, updateUser]);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      {!isLoggedIn ? (
        <View style={styles.container}>
          <View style={styles.introBox}>
            <Text style={styles.headerFont}>
              {'\n'}Hello!{'\n'}
            </Text>
            <Text style={fontStyles.regularFontCenter}>
              As a non registered user, you can only browse items{'\n'}
            </Text>
            <Text style={fontStyles.regularFontCenter}>
              You can go back to login screen by clicking the button down below
              {'\n'}
            </Text>
            <Button
              buttonStyle={styles.buttonWhite}
              titleStyle={fontStyles.boldBlackFont}
              title={'Go back to login'}
              onPress={() => {
                setAskLogin(false);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 0, width: '100%'}}>
          <View
            style={{
              width: '100%',
            }}
          >
            {selectedView ? (
              <>
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 50,
                  }}
                >
                  <Button
                    title="My Items"
                    titleStyle={fontStyles.regularBlackFont}
                    buttonStyle={{
                      width: '100%',
                      backgroundColor: 'white',
                      alignItems: 'center',
                    }}
                    onPress={() => setSelectedView(!selectedView)}
                  />
                  <Button
                    title="Saved Items"
                    titleStyle={fontStyles.regularBlackFont}
                    buttonStyle={{
                      backgroundColor: '#fff',
                      borderBottomWidth: 1,
                      borderStyle: 'solid',
                      borderBottomColor: 'black',
                      width: '100%',
                    }}
                  />
                </View>
                <SavedItems navigation={navigation} />
              </>
            ) : (
              <>
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    title="My Items"
                    titleStyle={fontStyles.regularBlackFont}
                    buttonStyle={{
                      backgroundColor: '#fff',
                      borderBottomWidth: 1,
                      borderStyle: 'solid',
                      borderBottomColor: 'black',
                      width: '100%',
                    }}
                  />
                  <Button
                    title="Saved Items"
                    titleStyle={fontStyles.regularBlackFont}
                    buttonStyle={{
                      width: '100%',
                      backgroundColor: 'white',
                    }}
                    onPress={() => setSelectedView(!selectedView)}
                  />
                </View>
                <MyItems navigation={navigation} />
              </>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  basicFont: {
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 30,
  },
  introBox: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonWhite: {
    marginTop: 5,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
