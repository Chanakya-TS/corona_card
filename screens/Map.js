/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

import DisplayRZ from '../component/DisplayRZ';

import Radar from 'react-native-radar';

  const Map = () => {
  const [error, setError] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  function updateLocationAndRegion() {
    Radar.getLocation().then(({location}) => {
      setUserLocation(location);
      setMapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })
    }).catch((err) => {
      console.log(err);
      setError(true);
    });
  }

  useEffect(() => {
      updateLocationAndRegion();
  }, []);

  if (!error) {
    if (userLocation) {
      return (
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
      <DisplayRZ/>
      </MapView>
      // <View>
      //   <Text>{JSON.stringify(userLocation)}</Text>
      // </View>
      );
    } else {
      return (
        <MapView
          style={styles.map}
          region={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
         />
      // {/* <View>
      //   <Text>LOADING</Text>
      // </View> */}
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
    ...StyleSheet.absoluteFillObject,
  },
});
