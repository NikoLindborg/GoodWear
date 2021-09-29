import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import List from '../components/List';

const Home = ({navigation}) => {
  return (
    <ScrollView style={{paddingTop: 0, marginTop: 0}}>
      <SafeAreaView style={styles.droidSafeArea}>
        <Image
          source={require('../assets/GW_graphics_slogan.png')}
          style={styles.topImage}
        />
        <View style={styles.introBox}>
          <Text style={styles.headerFont}>
            {'\n'}Hello user!{'\n'}
          </Text>
          <Text style={styles.basicFont}>
            Scroll to find the latest items in Goodwear or add categories that
            you are looking for{'\n'}
          </Text>
          <Text style={styles.basicFont}>
            Edit or add to your watchlist{'\n'}
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.postBackground}>
        <View style={styles.textBar}>
          <Text style={styles.headerFont}>Newest in clothing</Text>
        </View>
        <List style={styles.list} navigation={navigation} />
      </View>

      <View style={styles.divider} />

      <View style={styles.postBackgroundEggshell}>
        <View style={styles.textBarGreen}>
          <Text style={styles.headerFont}>Newest in clothing</Text>
        </View>
        <List style={styles.list} navigation={navigation} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
  },
  textBar: {
    backgroundColor: '#F4F1DE',
    height: 50,
    width: '90%',
    position: 'absolute',
    top: 10,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  textBarGreen: {
    backgroundColor: '#9AC1AE',
    height: 50,
    width: '90%',
    position: 'absolute',
    top: 10,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  postBackground: {
    backgroundColor: '#9AC1AE',
    height: 450,
  },
  postBackgroundEggshell: {
    backgroundColor: '#F4F1DE',
    height: 450,
  },
  topImage: {
    width: 400,
    height: 100,
    resizeMode: 'contain',
  },
  list: {},
  introBox: {
    alignSelf: 'center',
    padding: 10,
  },
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
  basicFont: {
    fontFamily: 'RobotoCondensed_400Regular',
  },
  divider: {
    margin: 50,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
