import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainContext} from '../contexts/MainContext';
import Login from '../views/Login';
import Profile from '../views/Profile';
import Settings from '../views/Settings';
import ModifyUser from '../views/ModifyUser';
import Upload from '../views/Upload';
import SingleItem from '../views/SingleItem';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Front"
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
        }}
        component={Profile}
        name="Upload"
        options={{
          tabBarLabel: 'Upload',
          headerShown: false,
        }}
        component={Upload}
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
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ModifyUser" component={ModifyUser} />
          <Stack.Screen name="SingleItem" component={SingleItem} />
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
