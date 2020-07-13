/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { AuthContext } from './contexts/AuthContext.js';
import { RegionsContext } from './contexts/RegionsContext.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import Profile from './screens/Profile';
import Home from './screens/Home.js';
import Map from './screens/Map.js';
import About from './screens/About.js';
import Settings from './screens/Settings.js';
import Splash from './screens/Splash.js';

import { useState, useEffect, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';

import firestore from '@react-native-firebase/firestore';

import Radar from 'react-native-radar';

const Tabs = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
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

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{title: 'Sign In'}}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{title: 'Create Account'}}
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

const App = (props) => {
  // to simulate loading and logging in
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  // const authContext = React.useMemo(() => {
  //   return{
  //     signIn: () => {
  //       setIsLoading(false);
  //       setUserToken('123')
  //     },
  //     signUp: () => {
  //       setIsLoading(false);
  //       setUserToken('123');
  //     },
  //     signOut: () => {
  //       setIsLoading(false);
  //       setUserToken(null);
  //     }
  //   }
  // }, [])

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000)
  // }, []);

  // if (isLoading){
  //   return <Splash />
  // }

  const [initializingUser, setInitializingUser] = useState(true);
  const [initializingRZ, setInitializingRZ] = useState(true);
  const [user, setUser] = useState(null);

  const authContext = useMemo(() => {
    return {
      signOut: () => {
        auth()
          .signOut()
          .then(() => console.log('User signed out'))
      },

      signInWithGmail: async () => {
        const { idToken, accessToken  } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
        return auth().signInWithCredential(googleCredential).then((userInfo) => {console.log(userInfo)}).cath;
      },

      signInAnonymous: () => {
        auth()
          .signInAnonymously()
          .then(() => {
            console.log('Anonymous user has signed in')
          })
          .catch( error => {
            if (error.code === 'auth/operation-not-allowed') {
              console.log('Enable anonymous in your firebase console')
            }
            console.error(error);
          })
      },

      signUpWithEmail: () => {
        auth()
          .createUserWithEmailAndPassword('chanakyats@gmail.com', '123456')
          .then(() => {
            console.log('User account was created and signed in!')
          })
          .catch(( error ) => {
            if (error.code === 'auth/invalid-email'){
              // eslint-disable-next-line quotes
              console.log("That email address is invalid ")
            }
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email is already in use')
            }
            console.log(error);
          })
      },

      signInWithEmail: () => {
        auth()
          .signInWithEmailAndPassword('chanakyats@gmail.com', '123456')
          .then(() => {
            console.log('User account was created and signed in!')
          })
          .catch(( error ) => {
            if (error.code === 'auth/invalid-email'){
              console.log('That email address is invalid ')
            }
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email is already in use')
            }
            console.log(error);
          })
      },

      // signInWithFacebook: async () => {
      //   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      //   if (result.isCancelled) {
      //     throw 'User cancelled the login process';
      //   }
      //   const data = await AccessToken.getCurrentAccessToken();
      //   if (!data) {
      //     throw 'Something went wrong obtaining access token';
      //   }
      //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      //   return auth().signInWithCredential(facebookCredential).catch((error) => {
      //     console.log(error);
      //   });
      // },

      signOutAcc: () => {
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
      },
      }
  })

  function onAuthStateChanged(user){
    setUser(user);
    if (initializingUser) {setInitializingUser(false);}
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '380907738035-l391j339sa11ka5d20jujjc3727k1tsc.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  }, [onAuthStateChanged]);

  const [regionsContext, setRegionsContext] = useState(null);

  async function getRegions(){
    const regionsContext = await firestore()
                                .collection('regions')
                                .get();
    setRegionsContext(regionsContext);
    if (initializingRZ) {setInitializingRZ(false)}
  }

  useEffect(() => {
    getRegions();
  }, [])

  useEffect(() => {
    Radar.getPermissionsStatus().then((status) => {
      if (status !== 'GRANTED_BACKGROUND') {
        Radar.requestPermissions(true);
      }
    });
  }, [])

  // const RegionsContext = {

  // }

  if (initializingUser) {return <Splash text="Loading User"/>;}
  if (initializingRZ) {return <Splash text="Loading Red Zones" />;}
  return (
    <RegionsContext.Provider valuse={regionsContext}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootStackScreen userToken={user}/>
        </NavigationContainer>
      </AuthContext.Provider>
    </RegionsContext.Provider>
  )
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
