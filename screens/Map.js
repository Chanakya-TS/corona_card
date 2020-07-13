/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

  const Map = ({route}) => {
  const [error, setError] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  function updateLocationAndRegion() {
    Geolocation.getCurrentPosition(({coords}) => {
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setMapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    });
  }

  useEffect(() => {
    try {
      updateLocationAndRegion();
    } catch {
      setError(true);
    }
  }, []);

  // useEffect( () => {
  //   Geolocation.getCurrentPosition(({ coords }) => {
  //     setUserLocation({
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //     });
  //     setMapRegion({
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //       latitudeDelta: 0.04,
  //       longitudeDelta: 0.04,
  //     });
  //   });
  // });
  // Geolocation.getCurrentPosition(({coords}) => setUserLocation(coords));
  if (!error) {
    if (userLocation) {
      return (
      <MapView style={styles.map} region={mapRegion}> 
      <Marker 
        coordinate={userLocation}
        title="Your Location"
      />
      </MapView>
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
      );
    }
  } else {
    return (
      <View>
        <Text>ERROR!</Text>
      </View>
    );
  }
  // if (userLocation) {
  //   return (
  //     <View>
  //       <Text>{JSON.stringify(mapRegion)}</Text>
  //     </View>
  //   );
  // } else {
  //   return (
  //     <View>
  //       <Text>loading</Text>
  //     </View>
  //   );
  // }
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
