// Import React core components
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {StateContext} from '../contexts/StateContext';

// Import for Map
import MapView, {Marker} from 'react-native-maps';

// Import to access region data
import firestore from '@react-native-firebase/firestore';

// Import to display red zones
import DisplayRZ from '../component/DisplayRZ';

// Import to get user location
import Radar from 'react-native-radar';
import Splash from './Splash';

let regions = null;
  const Map = () => {
  const [gettingRegions, setGettingRegions] = useState(true);
  const [error, setError] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const {safe, danger, warning} = useContext(StateContext)

  function updateLocationAndRegion() {
    Radar.getLocation().then(({location}) => {
      setUserLocation(location);
      setMapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }).catch((err) => {
      console.log(err);
      setError(true);
    });
  }

  useEffect(() => {
      updateLocationAndRegion();
  }, []);


  const getRegions = () => {
    firestore()
      .collection('regions')
      .get()
      .then(querySnapshot => {
        const rz = [];
        querySnapshot.forEach(documentSnapshot => {
          rz.push({...documentSnapshot.data(), id: documentSnapshot.id});
        });
        regions = rz;
        setGettingRegions(false);
      });
  };

  useEffect(() => getRegions(), []);

  if (!error) {
    if (!gettingRegions) {
      if (userLocation) {
        return (
        <View>
        <MapView style={styles.map} region={mapRegion}>
        <Marker
          coordinate={
            {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }
          }
          title="Your Location"
        />
        <DisplayRZ regions={regions}/>
        </MapView>
        <View style={styles.statusContainer}>
          {danger ? (
            <View style={styles.statusBarD}>
            <Text style={styles.statusT}>LOCATION RISK</Text>
            <View style={styles.statusBarInnerD}>
              <Text style={styles.danger}>DANGER</Text>
            </View>
            </View>
          ) : (
            warning ? (
              <View style={styles.statusBarW}>
                <Text style={styles.statusT}>LOCATION RISK</Text> 
              <View style={styles.statusBarInnerW}>
                <Text style={styles.warning}>WARNING</Text>
              </View>
              </View>
            ) : (
              
              <View style={styles.statusBarS}>
                <Text style={styles.statusT}>LOCATION RISK</Text>
              <View style={styles.statusBarInnerS}>
                <Text style={styles.safe}>SAFE</Text>
              </View>
              </View>
            )
          )}
        </View>
        </View>
        );
      } else {
        return (
          <View>
          <MapView
            style={styles.map}
            region={{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          />
          <View style={styles.statusContainer}>
          {danger ? (
            <View style={styles.statusBarD}>
            <Text style={styles.statusT}>LOCATION RISK</Text>
            <View style={styles.statusBarInnerD}>
              <Text style={styles.danger}>DANGER</Text>
            </View>
            </View>
          ) : (
            warning ? (
              <View style={styles.statusBarW}>
                <Text style={styles.statusT}>LOCATION RISK</Text> 
              <View style={styles.statusBarInnerW}>
                <Text style={styles.warning}>WARNING</Text>
              </View>
              </View>
            ) : (
              
              <View style={styles.statusBarS}>
                <Text style={styles.statusT}>LOCATION RISK</Text>
              <View style={styles.statusBarInnerS}>
                <Text style={styles.safe}>SAFE</Text>
              </View>
              </View>
            )
          )}
        </View>
        </View>
        );
      }
  } else {
    return (
      <View>
        <Splash />
      </View>
    );
  }
  } else {
    return (
      <View>
        <Text>ERROR!</Text>
      </View>
    );
  }
};
export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '74%',
    width: '100%',
  },
  statusBarW: {
    height: '40%',
    backgroundColor: '#ff824d',
    alignItems: 'center'
  },
  statusT: {
    fontSize: 18,
    fontFamily: 'Spartan-ExtraBold',
    color: 'white'
  },
  statusBarInnerW: {
    width: '90%',
    backgroundColor: '#FF9877',
    alignItems: 'center',
  },
  warning: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Spartan-ExtraBold'
  },
  statusBarD: {
    height: '40%',
    backgroundColor: '#FF3636',
    alignItems: 'center'
  },
  statusBarInnerD: {
    width: '90%',
    backgroundColor: '#FF7777',
    alignItems: 'center',
  },
  danger: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Spartan-ExtraBold'
  },
  statusBarS: {
    height: '40%',
    backgroundColor: '#36ABFF',
    alignItems: 'center'
  },
  statusBarInnerS: {
    width: '90%',
    backgroundColor: '#77C6FF',
    alignItems: 'center',
  },
  safe: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Spartan-ExtraBold'
  },
});
