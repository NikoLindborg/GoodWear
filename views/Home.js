import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, StyleSheet, ScrollView, View} from 'react-native';
import {Button, Image, Text} from 'react-native-elements';
import List from '../components/List';
import fontStyles from '../utils/fontStyles';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';

const Home = ({navigation}) => {
  const {user, mediaArray} = useContext(MainContext);
  const [userFilters, setUserFilters] = useState();
  const [filteredMediaArray, setFilteredMediaArray] = useState();
  const {loadMedia} = useMedia();
  const [extraFilters, setExtraFilters] = useState(['jackets', 'shoes', 'hats']);

  if (user.full_name && !userFilters) {
    const parsedUserData = JSON.parse(user.full_name);
    console.log('pituus ', parsedUserData.items.length);
    setUserFilters(parsedUserData.items);
  }

  if (userFilters && !filteredMediaArray) {
    userFilters.forEach(async (e) => {
      const array = await loadMedia(e);
      setFilteredMediaArray(await array);
    });
  }

  return (
    <ScrollView style={{paddingTop: 0, marginTop: 0}}>
      <SafeAreaView style={styles.droidSafeArea}>
        <Image
          // eslint-disable-next-line no-undef
          source={require('../assets/GW_graphics_slogan.png')}
          style={styles.topImage}
        />
        {!userFilters ? (
          <View style={styles.introBox}>
            <Text style={styles.headerFont}>
              {'\n'}Hello {user.username}!{'\n'}
            </Text>
            <Text style={fontStyles.regularFont}>
              We see you have not yet added filters, and thats okay.{'\n'}
            </Text>
            <Text style={fontStyles.regularFont}>
              You can edit them from your profile, click the button below{'\n'}
            </Text>
            <Button
              title={'Watchlist'}
              onPress={() => {
                navigation.navigate('Settings');
              }}
            />
          </View>
        ) : (
          <View style={styles.postBackground}>
            <View style={styles.textBar}>
              <Text style={styles.headerFont}>
                Newest in your filtered categories
              </Text>
            </View>
            <List
              navigation={navigation}
              isHorizontal={true}
              data={filteredMediaArray}
            />
            <Button
              title={'SHOP MORE'}
              buttonStyle={styles.shopMore}
              titleStyle={fontStyles.boldFont}
              containerStyle={styles.shopMoreContainer}
              onPress={() => {
                navigation.navigate('ProductList', {category: 'accessories'});
              }}
            />
          </View>
        )}
      </SafeAreaView>

      <View style={styles.divider} />

      <View style={styles.postBackgroundEggshell}>
        <View style={styles.textBarGreen}>
          <Text style={styles.headerFont}>Newest in clothing</Text>
        </View>
        <List navigation={navigation} isHorizontal={true} data={mediaArray} />
        <Button
          title={'SHOP MORE'}
          buttonStyle={styles.shopMore}
          titleStyle={fontStyles.boldFont}
          containerStyle={styles.shopMoreContainer}
          onPress={() => {
            navigation.navigate('ProductList', {category: 'jackets'});
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'More ' + extraFilters[0]}
          //containerStyle={styles.shopMoreContainer}
          buttonStyle={styles.extraButtton}
          titleStyle={fontStyles.boldFont}
          onPress={() => {
            navigation.navigate('ProductList', {category: extraFilters[0]});
          }}
        />
        <Button
          title={'More ' + extraFilters[1]}
          //containerStyle={styles.shopMoreContainer}
          buttonStyle={styles.extraButtton}
          titleStyle={fontStyles.boldFont}
          onPress={() => {
            navigation.navigate('ProductList', {category: extraFilters[1]});
          }}
        />
        <Button
          title={'More ' + extraFilters[2]}
          //containerStyle={styles.shopMoreContainer}
          buttonStyle={styles.extraButtton}
          titleStyle={fontStyles.boldFont}
          onPress={() => {
            navigation.navigate('ProductList', {category: extraFilters[2]});
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
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
    width: '100%',
    justifyContent: 'center',
  },
  postBackgroundEggshell: {
    backgroundColor: '#F4F1DE',
    height: 450,
  },
  shopMore: {
    height: 75,
    alignSelf: 'center',
    backgroundColor: '#E07A5F',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  extraButton: {
    backgroundColor: '#E07A5F',
    color: '#E07A5F',
  },
  extraButtonContainer: {
    borderRadius: 0,
    backgroundColor: '#E07A5F',
  },
  shopMoreContainer: {
    borderRadius: 0,
    backgroundColor: '#E07A5F',
    alignSelf: 'center',
    width: '50%',
    position: 'absolute',
    zIndex: 1,
    bottom: -40,
  },
  topImage: {
    marginTop: 50,
    width: 400,
    height: 100,
    resizeMode: 'contain',
  },
  introBox: {
    alignSelf: 'center',
    padding: 10,
  },
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
  divider: {
    margin: 50,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
