import React, {useContext} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Card, Input, ListItem, Text} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import useEditForm from '../hooks/EditHooks';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModifyUser = ({navigation}) => {
  const {user, setUser} = useContext(MainContext);
  const {
    handleInputChange,
    handleInputEnd,
    inputs,
    checkUserAvailable,
    editErrors,
  } = useEditForm();
  const {editUser, checkToken} = useUser();

  const editUserInfo = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await editUser(inputs, userToken);
      if (result.message) {
        try {
          const userDetails = await checkToken(userToken);
          console.log(userDetails);
          if (userDetails) {
            setUser(userDetails);
            navigation.navigate('Settings');
          } else {
            console.log('EditUserInfo setUser failed');
          }
        } catch (e) {
          console.log(e.message);
        }
        Alert.alert(result.message);
      } else {
        Alert.alert('Edit failed');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Card
      containerStyle={{
        height: '95%',
        flex: 0,
      }}
    >
      <View style={{height: 300, maxWidth: '80%'}}>
        <ListItem>
          <View style={{width: '35%'}}>
            <Text style={styles.basicFont}>username: </Text>
          </View>
          <Input
            autoCapitalize="none"
            onChangeText={(txt) => handleInputChange('username', txt)}
            onEndEditing={(event) => {
              checkUserAvailable(event.nativeEvent.text);
              handleInputEnd('username', event.nativeEvent.text);
            }}
            errorMessage={editErrors.username}
          >
            {user.username}
          </Input>
        </ListItem>
        <ListItem>
          <View style={{width: '35%'}}>
            <Text style={styles.basicFont}>email: </Text>
          </View>
          <Input
            autoCapitalize="none"
            onChangeText={(txt) => handleInputChange('email', txt)}
            onEndEditing={(event) => {
              handleInputEnd('email', event.nativeEvent.text);
            }}
          >
            {user.email}
          </Input>
        </ListItem>
      </View>
      <Button
        title="Save Changes"
        buttonStyle={{width: 200, height: 100, alignSelf: 'center'}}
        onPress={editUserInfo}
      ></Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  basicFont: {
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 16,
  },
});

ModifyUser.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ModifyUser;
