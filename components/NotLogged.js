/**
 * Component file used in NotLoggedInScreen
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';
import {MainContext} from '../contexts/MainContext';
import {StyleSheet} from 'react-native';

const NotLogged = () => {
  // context that, when false, redirects into the login screen
  const {setAskLogin} = useContext(MainContext);

  return (
    <View style={styles.container}>
      <View style={styles.introBox}>
        <Text style={styles.headerFont}>
          {'\n'}Hello!{'\n'}
        </Text>
        <Text style={fontStyles.regularFontCenter}>
          As a non registered user, you can only browse items{'\n'}
        </Text>
        <Text style={fontStyles.regularFontCenter}>
          You can go back to login screen by clicking the button down below
          {'\n'}
        </Text>
        <Button
          buttonStyle={styles.buttonWhite}
          titleStyle={fontStyles.boldBlackFont}
          title={'Go back to login'}
          onPress={() => {
            setAskLogin(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    top: '30%',
  },
  introBox: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  buttonWhite: {
    marginTop: 5,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
});

export default NotLogged;
