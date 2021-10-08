import React from 'react';
import PropTypes from 'prop-types';
import {Alert, View} from 'react-native';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';

import {Button} from 'react-native-elements';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = ({navigation}) => {
  const {register} = useUser();
  const {checkUserAvailable, registerErrors, handleInputEnd} = useSignUpForm();

  const doRegister = async () => {
    try {
      const serverResponse = await register(inputs);
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
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={async (event) => {
          const text = event.nativeEvent.text;
          const availability = await checkUserAvailable(text);
          handleInputEnd('username', text, inputs);
        }}
        errorMessage={registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
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
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
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
        onChangeText={(txt) => handleInputChange('email', txt)}
        errorMessage={registerErrors.email}
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          handleInputEnd('email', text, inputs);
        }}
      />
      <Button raised title="Register!" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};
export default RegisterForm;
