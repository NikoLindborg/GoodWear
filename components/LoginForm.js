/**
 * Form component used in login.js for logging in
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontStyles from '../utils/fontStyles';

const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {login} = useLogin();
  const {inputs, handleInputChange} = useLoginForm();

  const doLogin = async () => {
    try {
      const loginInfo = await login(JSON.stringify(inputs));
      await AsyncStorage.setItem('userToken', loginInfo.token);
      // here we are create userObject that we add to main context for use in other views
      const userObject = {
        email: loginInfo.user.email,
        full_name: loginInfo.user.full_name,
        user_id: loginInfo.user.user_id,
        username: loginInfo.user.username,
      };
      setUser(userObject);
      // once api-call is done, token added to AsyncStorage and userObject created, we change the value of loggedIn context to true
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button
        raised
        title="Login!"
        onPress={doLogin}
        titleStyle={fontStyles.boldFont}
        buttonStyle={styles.redButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  redButton: {
    backgroundColor: '#E07A5F',
  },
});

LoginForm.propTypes = {
  navigation: PropTypes.object,
};
export default LoginForm;
