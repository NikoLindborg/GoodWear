import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, ButtonGroup, Card} from 'react-native-elements';
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

  const buttons = ['My items', 'Saved items'];

  return (
    <ScrollView>
      <Card containerStyle={{flex: 0}}>
        <Avatar
          icon={{
            name: 'cog',
            type: 'font-awesome',
            color: 'black',
            size: 35,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          onPress={() => {
            navigation.navigate('Settings');
          }}
          containerStyle={{alignSelf: 'flex-end'}}
        />
        <Card.Title>
          <Text h1 style={styles.basicFont}>
            {user.username}
          </Text>
        </Card.Title>
      </Card>
      <Card>
        {selectedView ? (
          <>
          <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: 60,
                width: '100%',
              }}
            >
              <Button
                title="My Items"
                raised
                containerStyle={{width: 145, height: 40}}
                onPress={() => setSelectedView(!selectedView)}
              ></Button>
              <Button
                title="Saved Items"
                buttonStyle={{
                  backgroundColor: '#9AC1AE',
                }}
                raised
                containerStyle={{width: 145, height: 40}}
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
                justifyContent: 'space-around',
                height: 60,
                width: '100%',
              }}
            >
              <Button
                title="My Items"
                buttonStyle={{
                  backgroundColor: '#9AC1AE',
                }}
                raised
                containerStyle={{width: 145, height: 40}}
              ></Button>
              <Button
                title="Saved Items"
                raised
                containerStyle={{width: 145, height: 40}}
                onPress={() => setSelectedView(!selectedView)}
              ></Button>
            </View>
            <MyItems />
          </>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {height: 50, width: '100%', alignSelf: 'center'},
  basicFont: {
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 30,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
