import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Card} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import MyItems from '../components/MyItems';
import SavedItems from '../components/SavedItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useUser} from '../hooks/ApiHooks';
import fontStyles from '../utils/fontStyles';

const Profile = ({navigation}) => {
  const [selectedView, setSelectedView] = useState(false);
  const {user, setUser, isLoggedIn, setAskLogin} = useContext(MainContext);
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
  }, [update]);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      {!isLoggedIn ? (
        <View style={styles.container}>
          <View style={styles.introBox}>
            <Text style={styles.headerFont}>
              {'\n'}Hello!{'\n'}
            </Text>
            <Text style={fontStyles.regularFont}>
              As a non registered user, you can only browse listings
            </Text>
            <Text style={fontStyles.regularFont}>
              You can go back to login screen by clicking the button down below
              {'\n'}
            </Text>
            <Button
              buttonStyle={styles.buttonWhite}
              raised={true}
              titleStyle={fontStyles.boldBlackFont}
              title={'Go back to login'}
              onPress={() => {
                setAskLogin(false);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 0}}>
          <Card containerStyle={{flex: 0, backgroundColor: '#F4F1DE'}}>
            <Avatar
              icon={{
                name: 'cog',
                type: 'font-awesome',
                color: 'black',
                size: 35,
              }}
              onPress={() => {
                navigation.navigate('Settings');
              }}
              containerStyle={{
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 1,
              }}
            />
            <Card.Title>
              <Text h1 style={styles.basicFont}>
                {user.username}
              </Text>
            </Card.Title>
          </Card>
          <View style={{height: 500}}>
            {selectedView ? (
              <>
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 60,
                  }}
                >
                  <Button
                    title="My Items"
                    titleStyle={{color: '#E07A5F'}}
                    raised
                    buttonStyle={{
                      width: 165,
                      height: 60,
                      backgroundColor: 'white',
                    }}
                    onPress={() => setSelectedView(!selectedView)}
                  ></Button>
                  <Button
                    title="Saved Items"
                    buttonStyle={{
                      backgroundColor: '#E07A5F',
                      width: 165,
                      height: 60,
                    }}
                    raised
                  ></Button>
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
                    height: 60,
                  }}
                >
                  <Button
                    title="My Items"
                    buttonStyle={{
                      backgroundColor: '#E07A5F',
                      width: 165,
                      height: 60,
                    }}
                    raised
                  ></Button>
                  <Button
                    title="Saved Items"
                    titleStyle={{color: '#E07A5F'}}
                    raised
                    buttonStyle={{
                      width: 165,
                      height: 60,
                      backgroundColor: 'white',
                    }}
                    onPress={() => setSelectedView(!selectedView)}
                  ></Button>
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
