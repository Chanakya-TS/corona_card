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
    <AuthStack.Navigator>
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
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
      />
      <HomeStack.Screen
        name="Map"
        component={Map}
        options={({ route }) => ({
          title: route.params.name,
        })}
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
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
      />
    </ProfileStack.Navigator>
  )
  const TabsScreen = () => (
    <Tabs.Navigator>
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
  