// Import React core components
import React from 'react';

// Import navigators
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import screens
import SignIn from '../screens/SignIn';
import Profile from '../screens/Profile';
import Home from '../screens/Home.js';
import Map from '../screens/Map.js';
import Settings from '../screens/Settings.js';

// Import custom header
import Header from './Header';
import { Dimensions } from 'react-native';

// Create navigators
const Tabs = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

export const RootStackScreen = ({ userToken }) => {
    return (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
        <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
        />
      ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
        />
      )}
    </RootStack.Navigator>
    )
  }
  
  const AuthStackScreen = () => (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{title: 'Sign In'}}
      />
    </AuthStack.Navigator>
  )
  
  const DrawerScreen = () => (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={TabsScreen}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStackScreen}
      />
    </Drawer.Navigator>
  )
  
  const HomeStackScreen = () => (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#36ABFF',
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={() => {
          return  {
          headerTitle: () => (
          <Header 
            title='HOME' 
          />
        )
        , 
        headerTitleAlign: 'center', 
        height: '100%', 
        width: '100%'
        }}
        }
      />
      <HomeStack.Screen
        name="Map"
        component={Map}
        options={() => {
          return  {
          headerTitle: () => (
          <Header 
            title='MAP VIEW' 
          />
        )
        , 
        headerTitleAlign: 'center', 
        height: '100%', 
        width: '100%'
        }}
        }
      />
    </HomeStack.Navigator>
  )
  
  const SettingsStackScreen = () => (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
      />
    </SettingsStack.Navigator>
  )
  
  const ProfileStackScreen = () => (
    <ProfileStack.Navigator
    screenOptions={{
        headerStyle: {
          backgroundColor: '#36ABFF',
        },
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={() => {
          return  {
          headerTitle: () => (
          <Header 
            title='CORONA CARD' 
          />
        )
        , 
        headerTitleAlign: 'center', 
        height: '100%', 
        width: '100%'
        }}
        }
      />
    </ProfileStack.Navigator>
  )
  const TabsScreen = () => (
    <Tabs.Navigator
      tabBarOptions={{
        tabStyle: {
          justifyContent: 'center',
        }
      }}
    >
        <Tabs.Screen
          name="Home"
          component={HomeStackScreen}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileStackScreen}
        />
      </Tabs.Navigator>
  );
  