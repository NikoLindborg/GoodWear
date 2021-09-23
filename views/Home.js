import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, StyleSheet} from 'react-native';
import { MainContext } from '../contexts/MainContext';
import { Button } from 'react-native-elements/dist/buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };
  const {user, setIsLoggedIn} = useContext(MainContext);
  console.log(user)
  return <SafeAreaView style={styles.droidSafeArea}>
     <Button title={'Logout'} onPress={logout} />
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

Home.propTypes = {};

export default Home;
