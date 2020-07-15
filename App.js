// Import React core components
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// Import Contexts
import { AuthContext } from './contexts/AuthContext.js';
import {StateContext} from './contexts/StateContext.js';
import {UserContext} from './contexts/UserContext.js';

// Import for navigation
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './component/Navigation';

// Import screens
import Splash from './screens/Splash.js';

// Import for Firebase Auth
import { useState, useEffect, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

// Import for Firestore
import firestore from '@react-native-firebase/firestore';

// Import for geolocation
import Radar from 'react-native-radar';

// Import for push notification
import {LocalNotification} from './android/app/src/services/LocalPushController.js';


let timeID = null;
let flag = false;
let rzTimeID = null;
let rzTime = 0;

const App = () => {
  const [initializingUser, setInitializingUser] = useState(true);
  const [user, setUser] = useState(null);
  const [danger, setDanger] = useState(false);
  const [warning, setWarning] = useState(false);
  const [safe, setSafe] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  const authContext = useMemo(() => {
    return {

      signInWithGmail: async () => {
        const { idToken, accessToken  } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
        return auth().signInWithCredential(googleCredential).then((userInfo) =>{
          console.log('User signed in with Gmail')
          if (userInfo.additionalUserInfo.isNewUser) {
            console.log("User is new!")
            setIsNewUser(true);
            flag = false;
          }
        }).catch;
      },

      signOutAcc: () => {
        clearInterval(timeID);
        console.log('Stopped warning')
        Radar.stopTracking();
        console.log('Stopped Tracking')
        setUser(null);
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
      },
      }
  })

  function onAuthStateChanged(user){
    setUser(user);
    if (user) {
      Radar.startTrackingResponsive();
      console.log('Started Tracking');
    }
    if (initializingUser) {setInitializingUser(false);}
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '380907738035-l391j339sa11ka5d20jujjc3727k1tsc.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  }, [onAuthStateChanged]);

  useEffect(() => {
    Radar.getPermissionsStatus().then((status) => {
      if (status !== 'GRANTED_BACKGROUND') {
        Radar.requestPermissions(true);
      }
    });
  }, [])

  let clientLocation = null;

  Radar.on('clientLocation', (result) => {
    clientLocation = {
      latitude: result.location.latitude,
      longitude: result.location.longitude,
    }
  });

  async function getLatLongRad(externalId) {
    let LatLongRad;
    await firestore()
      .collection('regions')
      .doc(externalId)
      .get()
      .then((documentSnapshot) => {
        LatLongRad = documentSnapshot.data();
      })
      return LatLongRad;
  }

  function calculateDistance(clLat, clLong, rzLat, rzLong){
    console.log()
    console.log('-------------------------------')
    console.log('CL: ', clLat, clLong);
    console.log('RZ', rzLat, rzLong);
    function toRadians(degree) {
      let one_deg = (Math.PI) / 180;
      return (one_deg * degree);
    }

    clLat = toRadians(clLat);
    clLong = toRadians(clLong);
    rzLat = toRadians(rzLat);
    rzLong = toRadians(rzLong);

    let dLong = rzLong - clLong;
    let dLat = rzLat - clLat;

    let ans = Math.pow( Math.sin(dLat / 2), 2) + Math.cos(clLat) * Math.cos(rzLat) * Math.pow( Math.sin(dLong / 2), 2);

    ans = 2 * Math.asin(Math.sqrt(ans));
    let R = 6371;
    ans = ans * R;
    ans = ans * 1000;
    return ans;
  }

  useEffect(() => {
    if (user) {
      if (danger) {
      console.log('Timer started');
      rzTimeID = setInterval(() => {
        rzTime += 1;
      }, 60000)
      LocalNotification('You are in a red zone, be careful!', 'Corona-Card Alert', 'Danger: You Are In A Red Zone', 'YOU ARE IN A RED ZONE')
      } else {
        console.log('RZ TIME:', rzTime);
        clearInterval(rzTimeID);
        firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => documentSnapshot.get('rzTime'))
        .then(currentRzTime => {
          let updatedRzTime = (rzTime / 60 ) + currentRzTime;
          firestore()
            .collection('Users')
            .doc(user.uid)
            .update({
              rzTime: updatedRzTime,
            })
            .then(() => {
              firestore()
                .collection('Users')
                .doc(user.uid)
                .get()
                .then(documentSnapshot => documentSnapshot.get('rzTime'))
                .then(currentRzTime => {
                  console.log('Updated Rz Time:', currentRzTime)
                })
            })
            .then(() => {
              rzTime = 0;
            })
        })
      }
    }
  }, [danger])

  useEffect(() => {
    if (warning) {
      LocalNotification('You are near a red zone, be careful!', 'Corona-Card Alert', 'Warning: You Are Near A Red Zone', 'YOU ARE NEAR A RED ZONE')
    }
  }, [warning])

  if (true) {return <Splash text="Loading User"/>;}
  if (!flag) {
    timeID = setInterval( () => {
      Radar.searchGeofences({
        radius: 500,
        tags: ['RedZone'],
        limit: 10,
      }).then((result) => {
        if (Object.keys(result.geofences).length > 0) {
            result.geofences.forEach(async (region) => {
              await getLatLongRad(region.externalId).then((result) => {
                let distance = calculateDistance(clientLocation.latitude, clientLocation.longitude, result.lat, result.long);
                console.log('Distance:', distance);
                if (distance < result.radius) {
                  console.log('In the Red zone: DANGER')
                  console.log('-------------------------------')
                  console.log()
                  setDanger(true);
                  setSafe(false);
                  setWarning(false);
                } else if (distance > result.radius){
                  console.log('Near red zone: Warning')
                  console.log('-------------------------------')
                  console.log()
                  setWarning(true);
                  setSafe(false);
                  setDanger(false);
                }
              });
            })
        } else {
            console.log('Not near red zone: Safe')
            console.log('-------------------------------')
            console.log()
            setSafe(true);
            setWarning(false);
            setDanger(false);
        }
      }).catch((err) => {
        console.log('ERROR SEACRH GEOFENCE: ', err);
      });
    }, 5000);
    flag = true;
  }

  return (
    <UserContext.Provider value={{user: user, isNewUser: isNewUser}}>
      <AuthContext.Provider value={authContext}>
        <StateContext.Provider value={{warning: warning,safe: safe, danger: danger}}>
          <NavigationContainer>
            <RootStackScreen userToken={user} isNewUser={isNewUser}/>
          </NavigationContainer>
        </StateContext.Provider>
      </AuthContext.Provider>
    </UserContext.Provider>
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
