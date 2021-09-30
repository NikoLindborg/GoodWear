import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, ButtonGroup, Card, colors} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {MainContext} from '../contexts/MainContext';
import MyItems from '../components/MyItems';
import SavedItems from '../components/SavedItems';

const Profile = ({navigation}) => {
  const {user} = useContext(MainContext);
  const [selectedView, setSelectedView] = useState(false);
  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <View style={{flex: 0}}>
      <Card containerStyle={{flex: 0, backgroundColor: '#F4F1DE'}}>
        <Avatar
          icon={{
            name: 'cog',
            type: 'font-awesome',
            color: 'black',
            size: 35,
          }}
          onPress={() => {
            navigation.navigate('Settings');
          }}
          containerStyle={{position: 'absolute', right: 0, top: 0, zIndex: 1}}
        />
        <Card.Title>
          <Text h1 style={styles.basicFont}>
            {user.username}
          </Text>
        </Card.Title>
      </Card>
      <View style={{height: 500}}>
        {selectedView ? (
          <>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                height: 60,
              }}
            >
              <Button
                title="My Items"
                raised
                buttonStyle={{
                  width: 165,
                  height: 60,
                }}
                onPress={() => setSelectedView(!selectedView)}
              ></Button>
              <Button
                title="Saved Items"
                buttonStyle={{
                  backgroundColor: '#E07A5F',
                  width: 165,
                  height: 60,
                }}
                raised
              ></Button>
            </View>
            <SavedItems />
          </>
        ) : (
          <>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                height: 60,
              }}
            >
              <Button
                title="My Items"
                buttonStyle={{
                  backgroundColor: '#E07A5F',
                  width: 165,
                  height: 60,
                }}
                raised
              ></Button>
              <Button
                title="Saved Items"
                raised
                buttonStyle={{
                  width: 165,
                  height: 60,
                }}
                onPress={() => setSelectedView(!selectedView)}
              ></Button>
            </View>
            <MyItems />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basicFont: {
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 30,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
