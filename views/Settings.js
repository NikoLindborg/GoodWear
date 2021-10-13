import React, {useContext, useEffect, useState} from 'react';
import {Alert, FlatList, Platform, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  Icon,
  ListItem,
  Text,
} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterForm from '../components/FilterForm';
import {useUser} from '../hooks/ApiHooks';
import useFilterForm from '../hooks/FilterHooks';
import fontStyles from '../utils/fontStyles';
import {useIsFocused} from '@react-navigation/native';

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
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused();

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const selectedFilters = () => {
    if (user.full_name) {
      const allData = JSON.parse(user.full_name);
      setItems(allData.items);
      setValue(allData.items);
    }
  };

  useEffect(() => {
    (() => {
      selectedFilters();
    })();
  }, []);

  const addFilteredItems = async () => {
    if (value) {
      const filteredItems = {
        items: value,
      };
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
    }
  };

  if (items && value !== items) {
    console.log('1');
    addFilteredItems();
    setItems(value);
  } else if (!items && value) {
    console.log('asddd');
    addFilteredItems();
    setItems(value);
  }
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
        <Card
          containerStyle={{
            height: '95%',
            flex: 0,
          }}
        >
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
              <Text>Please set your watchlist from below</Text>
              <FilterForm
                inputs={inputs}
                handleInputChange={handleInputChange}
                value={value}
                setValue={setValue}
              />
            </View>
          ) : (
            <View containerStyle={{height: 'auto', zIndex: 2}}>
              <FilterForm
                inputs={inputs}
                handleInputChange={handleInputChange}
                value={value}
                setValue={setValue}
              />
            </View>
          )}
          <ListItem containerStyle={{top: '130%'}} onPress={logout}>
            <Avatar icon={{name: 'logout', color: 'black'}} />
            <ListItem.Content>
              <ListItem.Title>Logout</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </Card>
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
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
