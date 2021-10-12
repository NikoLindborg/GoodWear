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
import {Icon} from 'react-native-elements';
import NotLoggedInScreen from '../views/NotLoggedInScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  const {unreadMessages} = useContext(MainContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Front"
        options={{
          tabBarActiveTintColor: '#E07A5F',
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: () => <Icon name="home" color={'grey'} size={25} />,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarActiveTintColor: '#E07A5F',
          tabBarLabel: 'Search',
          tabBarIcon: () => <Icon name="search" color={'grey'} size={25} />,
        }}
        component={Search}
      />
      <Tab.Screen
        name="Upload"
        options={{
          tabBarActiveTintColor: '#E07A5F',
          tabBarLabel: 'Upload',
          tabBarIcon: () => (
            <Icon
              name="add"
              color={'white'}
              backgroundColor={'#E07A5F'}
              borderRadius={20}
              size={25}
            />
          ),
        }}
        component={Upload}
      />
      {unreadMessages.length > 0 ? (
        <Tab.Screen
          name="Messages"
          options={{
            tabBarActiveTintColor: '#E07A5F',
            tabBarLabel: 'Messages',
            tabBarIcon: () => <Icon name="chat" color={'grey'} size={25} />,
            tabBarBadge: unreadMessages.length,
            tabBarBadgeStyle: {backgroundColor: '#E07A5F', color: 'white'},
          }}
          component={Messages}
        />
      ) : (
        <Tab.Screen
          name="Messages"
          options={{
            tabBarActiveTintColor: '#E07A5F',
            tabBarLabel: 'Messages',
            tabBarIcon: () => <Icon name="chat" color={'grey'} size={25} />,
          }}
          component={Messages}
        />
      )}

      <Tab.Screen
        name="Profile"
        options={{
          tabBarActiveTintColor: '#E07A5F',
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: () => <Icon name="person" color={'grey'} size={25} />,
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn, askLogin} = useContext(MainContext);
  const customOptions = {
    headerTintColor: '#E07A5F',
    headerTitleStyle: {color: 'black'},
  };
  return (
    <Stack.Navigator>
      {isLoggedIn || askLogin ? (
        <>
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
            component={TabScreen}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={customOptions}
          />
          <Stack.Screen
            name="SingleItem"
            component={SingleItem}
            options={customOptions}
          />
          <Stack.Screen name="Chat" component={Chat} options={customOptions} />
          <Stack.Screen
            name="ProductList"
            component={ProductList}
            options={customOptions}
          />
          <Stack.Screen
            name="FilteredView"
            component={FilteredView}
            options={customOptions}
          />
          <Stack.Screen name="ModifyUser" component={ModifyUser} />
          <Stack.Screen name="Modify" component={Modify} />
          <Stack.Screen
            name="NotLoggedInScreen"
            component={NotLoggedInScreen}
            options={customOptions}
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
