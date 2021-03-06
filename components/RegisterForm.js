/**
 * Form component used for registering in login screen
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Alert, StyleSheet, View} from 'react-native';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {Button} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';
import {useLogin, useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = ({navigation}) => {
  const {register} = useUser();
  const {checkUserAvailable, registerErrors, handleInputEnd} = useSignUpForm();
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {login} = useLogin();

  const doRegister = async () => {
    try {
      const serverResponse = await register(inputs);
      if (serverResponse) {
        const loginInfo = await login(JSON.stringify(inputs));
        await AsyncStorage.setItem('userToken', loginInfo.token);
        const userObject = {
          email: loginInfo.user.email,
          user_id: loginInfo.user.user_id,
          username: loginInfo.user.username,
        };
        // once registering is done, the user is logged in and the context user is set
        setUser(userObject);
        setIsLoggedIn(true);
      }
      Alert.alert(serverResponse.message);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const {inputs, handleInputChange} = useSignUpForm();
  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt, inputs)}
        onEndEditing={async (event) => {
          const text = event.nativeEvent.text;
          await checkUserAvailable(text);
          handleInputEnd('username', text, inputs);
        }}
        errorMessage={registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt, inputs)}
        secureTextEntry={true}
        errorMessage={registerErrors.password}
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          handleInputEnd('password', text, inputs);
        }}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="confirm password"
        onChangeText={(txt) =>
          handleInputChange('confirmPassword', txt, inputs)
        }
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          handleInputEnd('confirmPassword', text, inputs);
        }}
        secureTextEntry={true}
        errorMessage={registerErrors.confirmPassword}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt, inputs)}
        errorMessage={registerErrors.email}
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          handleInputEnd('email', text, inputs);
        }}
      />
      <Button
        raised
        title="Register!"
        onPress={doRegister}
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

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};
export default RegisterForm;
