import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {login} = useLogin();
  const {inputs, handleInputChange} = useLoginForm();

  const doLogin = async () => {
    try {
      const loginInfo = await login(JSON.stringify(inputs));
      await AsyncStorage.setItem('userToken', loginInfo.token);
      const userObject = {
        email: loginInfo.user.email,
        full_name: loginInfo.user.full_name,
        user_id: loginInfo.user.user_id,
        username: loginInfo.user.username,
      };
      setUser(userObject);
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
      <Button raised title="Login!" onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};
export default LoginForm;
