/**
 * Js-file for user settings in profile
 *
 *
 * Load list of filters set by User
 * Show list as dropdown menu, where you can also change selected items.
 *
 * Navigation to Modify user details
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */
import React, {useContext, useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Button, Card, ListItem, Text} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterForm from '../components/FilterForm';
import {useUser} from '../hooks/ApiHooks';
import useFilterForm from '../hooks/FilterHooks';
import fontStyles from '../utils/fontStyles';

const Settings = ({navigation}) => {
  const {
    setIsLoggedIn,
    user,
    setUser,
    isLoggedIn,
    setAskLogin,
    setNewWatchlist,
  } = useContext(MainContext);
  const {checkToken, editUser} = useUser();
  const {inputs, handleInputChange, value, setValue} = useFilterForm();

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const selectedFilters = () => {
    if (user.full_name) {
      const allData = JSON.parse(user.full_name);
      setValue(allData.items);
    }
  };

  useEffect(() => {
    (() => {
      selectedFilters();
    })();
  }, []);

  const addFilteredItems = async () => {
    let filteredItems;
    if (value) {
      filteredItems = {
        items: value,
      };
    } else {
      filteredItems = {};
    }
    const data = {full_name: JSON.stringify(filteredItems)};
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const result = await editUser(data, userToken);
        if (result) {
          const userInfo = await checkToken(userToken);
          if (userInfo.user_id) {
            setUser(userInfo);
            setNewWatchlist(true);
          }
        } else {
          console.log('Add filters failed');
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
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
              titleStyle={fontStyles.boldBlackFont}
              title={'Go back to login'}
              onPress={() => {
                setAskLogin(false);
              }}
            />
          </View>
        </View>
      ) : (
        <>
          <Card
            containerStyle={{
              height: '80%',
              flex: 0,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {Platform.OS === 'ios' ? (
              <ListItem
                style={{
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  zIndex: 1,
                }}
              >
                <Avatar
                  icon={{
                    name: 'edit',
                    type: 'font-awesome',
                    color: 'black',
                    size: 35,
                  }}
                  onPress={() => {
                    navigation.navigate('ModifyUser');
                  }}
                />
              </ListItem>
            ) : (
              <ListItem
                containerStyle={{
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  zIndex: 1,
                }}
              >
                <Avatar
                  icon={{
                    name: 'edit',
                    type: 'font-awesome',
                    color: 'black',
                    size: 35,
                  }}
                  onPress={() => {
                    navigation.navigate('ModifyUser');
                  }}
                />
              </ListItem>
            )}

            <View style={{height: 'auto'}}>
              <ListItem>
                <Text style={styles.basicFont}>Username: {user.username}</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.basicFont}>Email: {user.email}</Text>
              </ListItem>
            </View>
            <Card.Divider />
            {Platform.OS === 'ios' ? (
              <View style={{height: 'auto', zIndex: 2}}>
                <Text style={styles.filterText}>
                  Please set your watchlist from below
                </Text>
                <FilterForm
                  inputs={inputs}
                  handleInputChange={handleInputChange}
                  value={value}
                  setValue={setValue}
                />
              </View>
            ) : (
              <View containerStyle={{height: 'auto', zIndex: 2}}>
                <ListItem style={styles.filterTextBox}>
                  <Text style={styles.filterText}>
                    Please set your watchlist from below
                  </Text>
                </ListItem>

                <FilterForm
                  inputs={inputs}
                  handleInputChange={handleInputChange}
                  value={value}
                  setValue={setValue}
                />
              </View>
            )}
            <Button
              title={'Update filters'}
              buttonStyle={styles.updateButton}
              titleStyle={fontStyles.boldFont}
              onPress={addFilteredItems}
            />
          </Card>
          <Card
            containerStyle={{
              height: 'auto',
              alignContent: 'center',
            }}
          >
            <ListItem containerStyle={styles.logout} onPress={logout}>
              <Avatar icon={{name: 'logout', color: 'black'}} />
              <ListItem.Content>
                <ListItem.Title>Logout</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </Card>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  basicFont: {
    fontFamily: 'RobotoCondensed_400Regular',
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
  updateButton: {
    marginTop: 5,
    backgroundColor: '#E07A5F',
  },
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
  logout: {
    width: '100%',
    height: 'auto',
  },
  filterTextBox: {
    height: 50,
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
