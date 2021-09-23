import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, StyleSheet} from 'react-native';

const Home = (props) => {
  return <SafeAreaView style={styles.droidSafeArea}></SafeAreaView>;
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
