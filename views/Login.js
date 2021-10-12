import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {Button, Card} from 'react-native-elements';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import {ImageBackground} from 'react-native';
import {Image} from 'react-native';
import fontStyles from '../utils/fontStyles';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser, setAskLogin} = useContext(MainContext);
  const {checkToken} = useUser();
  const [formToggle, setFormToggle] = useState(true);

  const continueWithoutLogging = async () => {
    setAskLogin(true);
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
          setIsLoggedIn(true);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=840&q=80',
            }}
            style={styles.background}
          >
            <View style={styles.container2}>
              <Image
                source={{
                  uri: 'https://cdn.discordapp.com/attachments/821748272934289458/890674197804748810/GW_graphic.png',
                }}
                style={styles.logo}
              />
              <Card style={styles.card}>
                {formToggle ? (
                  <>
                    <Card.Title h3 style={fontStyles.boldFont}>
                      Login
                    </Card.Title>
                    <LoginForm navigation={navigation} />
                  </>
                ) : (
                  <>
                    <Card.Title h3 style={fontStyles.boldFont}>
                      Register
                    </Card.Title>
                    <RegisterForm navigation={navigation} />
                  </>
                )}
                <Button
                  title={
                    formToggle ? 'New user? Register' : 'Already an user? Login'
                  }
                  onPress={() => setFormToggle(!formToggle)}
                  style={styles.button}
                  buttonStyle={styles.whiteButton}
                  titleStyle={fontStyles.regularBlackFont}
                />
                <Button
                  title={'Or continue without logging in'}
                  onPress={() => continueWithoutLogging()}
                  style={styles.button}
                  buttonStyle={styles.textButton}
                  titleStyle={fontStyles.regularBlackFont}
                />
              </Card>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 10,
    justifyContent: 'space-evenly',
  },
  keyboardView: {
    flex: 1,
  },
  button: {
    marginTop: 5,
  },
  redButton: {
    backgroundColor: '#E07A5F',
  },
  whiteButton: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  textButton: {
    backgroundColor: '#fff',
  },
  card: {
    flex: 7,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  logo: {
    flexBasis: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 294,
    height: 'auto',
    justifyContent: 'center',
  },
});
Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Login;
