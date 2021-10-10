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
import Chat from '../views/Chat';
import Messages from '../views/Messages';
import Search from '../views/Search';
import ProductList from '../views/ProductList';
import FilteredView from '../views/FilteredView';
import Modify from '../views/Modify';
import FirstLoginFilters from '../views/FirstLoginFilters';

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
        name="Search"
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
        }}
        component={Search}
      />
      <Tab.Screen
        name="Upload"
        options={{
          tabBarLabel: 'Upload',
          headerShown: false,
        }}
        component={Upload}
      />
      <Tab.Screen
        name="Messages"
        options={{
          tabBarLabel: 'Messages',
        }}
        component={Messages}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
        }}
        component={Profile}
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
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
            component={TabScreen}
          />

          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ModifyUser" component={ModifyUser} />
          <Stack.Screen name="SingleItem" component={SingleItem} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="FilteredView" component={FilteredView} />
          <Stack.Screen name="Modify" component={Modify} />
          <Stack.Screen
            name="FirstLoginFilters"
            component={FirstLoginFilters}
          />
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
