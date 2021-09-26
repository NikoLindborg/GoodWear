import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {Avatar, ButtonGroup, Card, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  useEffect(() => {
    (async () => {})();
  }, []);

  const buttons = ['My items', 'Offers', 'Saved items'];

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>
          <Text h1>{user.username}</Text>
        </Card.Title>
      </Card>
      <Card>
        <ButtonGroup
          buttons={buttons}
          containerStyle={styles.buttonGroup}
        ></ButtonGroup>
        <ListItem bottomDivider onPress={logout}>
          <Avatar icon={{name: 'logout', color: 'black'}} />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {height: 50},
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
