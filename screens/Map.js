// Import React core components
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Import for Map
import MapView, {Marker} from 'react-native-maps';

// Import to access region data
import firestore from '@react-native-firebase/firestore';

// Import to display red zones
import DisplayRZ from '../component/DisplayRZ';

// Import to get user location
import Radar from 'react-native-radar';

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
        <Text>Loading Regions</Text>
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
    ...StyleSheet.absoluteFillObject,
  },
});
