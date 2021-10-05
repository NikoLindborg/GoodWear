import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Card, ListItem, Text} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterForm from '../components/FilterForm';
import {useUser} from '../hooks/ApiHooks';

const Settings = ({navigation}) => {
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const {checkToken} = useUser();

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const selectedFilters = () => {
    const allData = JSON.parse(user.full_name);
    const items = allData.items;
    return items;
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
        console.log('getToken', e);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

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

      <View style={{height: 150}}>
        <ListItem>
          <Text style={styles.basicFont}>Username: {user.username}</Text>
        </ListItem>
        <ListItem>
          <Text style={styles.basicFont}>Email: {user.email}</Text>
        </ListItem>
      </View>
      <Card.Divider />
      <View style={{height: 'auto'}}>
        <FilterForm />
      </View>
      <View style={{height: 250}}>
        <Text h4 style={{alignSelf: 'center', marginTop: 40}}>
          Items you have selected:
        </Text>
        <FlatList
          data={selectedFilters()}
          keyExtractor={(item, index) => index.toString()}
          style={{alignItems: 'center'}}
          renderItem={({item}) => (
            <ListItem>
              <Text style={{fontSize: 20}}>{item}</Text>
            </ListItem>
          )}
        ></FlatList>
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
  basicFont: {
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 16,
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
