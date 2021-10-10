import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Card} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstLoginFilters = ({navigation}) => {
  const {user, setUser} = useContext(MainContext);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
        }
      } catch (e) {
        console.log('getToken profile', e);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={{flex: 0}}>
      <Text>KAMA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  basicFont: {
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 30,
  },
});

FirstLoginFilters.propTypes = {
  navigation: PropTypes.object,
};

export default FirstLoginFilters;
