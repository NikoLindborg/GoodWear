import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainContext} from '../contexts/MainContext';
import Login from '../views/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Front"
        options={{
          tabBarLabel: 'Home',
        }}
        component={Home}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={TabScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
