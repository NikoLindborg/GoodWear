import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Card, ListItem, Text} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Card
      containerStyle={{
        height: '95%',
        flex: 0,
      }}
    >
      <ListItem
        containerStyle={{
          alignSelf: 'flex-end',
          height: 50,
          width: 50,
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

      <ListItem>
        <Text style={styles.basicFont}>username: {user.username}</Text>
      </ListItem>
      <ListItem>
        <Text style={styles.basicFont}>email: {user.email}</Text>
      </ListItem>
      <Card.Divider />
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
