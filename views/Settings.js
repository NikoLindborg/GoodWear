import React, {useContext, useEffect, useState} from 'react';
import {Alert, FlatList, Platform, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Card, Icon, ListItem, Text} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterForm from '../components/FilterForm';
import {useUser} from '../hooks/ApiHooks';

const Settings = ({navigation}) => {
  const {setIsLoggedIn, user, setUser, updateFilter, setUpdateFilter} =
    useContext(MainContext);
  const {checkToken, editUser} = useUser();
  const [showBox, setShowBox] = useState(true);

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const selectedFilters = () => {
    if (user.full_name) {
      const allData = JSON.parse(user.full_name);
      const items = allData.items;
      return items;
    }
    return null;
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
        }
      } catch (e) {
        console.log('getToken settings', e);
      }
    }
  };

  const removeSelectedItem = async (item) => {
    const filteredItems = selectedFilters();
    const newFilteredItems = [];
    filteredItems.forEach((e) => {
      if (e !== item) {
        newFilteredItems.push(e);
      }
    });
    const newData = {
      items: newFilteredItems,
    };
    const data = {full_name: JSON.stringify(newData)};
    Alert.alert(
      'Delete filtered item?',
      'Are you sure you want to delete this filter?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            setShowBox(false);
            try {
              const userToken = await AsyncStorage.getItem('userToken');
              if (userToken) {
                const result = await editUser(data, userToken);
                if (result) {
                  setUser(data);
                  setUpdateFilter(updateFilter + 1);
                } else {
                  console.log('Add filters failed');
                }
              }
            } catch (e) {
              console.log(e.message);
            }
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  useEffect(() => {
    getToken();
  }, [updateFilter]);

  return (
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
          <FilterForm />
        </View>
      ) : (
        <View containerStyle={{height: 'auto', zIndex: 2}}>
          <FilterForm />
        </View>
      )}
      <View style={{height: 250}}>
        <Text h4 style={{alignSelf: 'center', marginTop: 40, zIndex: 1}}>
          Items you have selected:
        </Text>
        <FlatList
          data={selectedFilters()}
          keyExtractor={(item, index) => index.toString()}
          style={{alignItems: 'center'}}
          renderItem={({item}) => (
            <ListItem style={styles.listStyle}>
              <Text style={{fontSize: 20}}>{item}</Text>
              <Icon
                name="trash-outline"
                type="ionicon"
                onPress={() => removeSelectedItem(item)}
              ></Icon>
            </ListItem>
          )}
        />
      </View>
      <ListItem onPress={logout}>
        <Avatar icon={{name: 'logout', color: 'black'}} />
        <ListItem.Content>
          <ListItem.Title>Logout</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
