// Import React core components
import React from 'react';
import {StyleSheet} from 'react-native';

// Import Circle to display RZ
import {Circle} from 'react-native-maps';

const DisplayRZ = ({regions}) => {

  return (
    regions.map((region) => (
      <Circle
        key={region.id}
        center={{
          latitude: parseFloat(region.lat),
          longitude: parseFloat(region.long),
        }}
        strokeColor="rgba(244,0,0, 1)"
        fillColor="rgba(244,0,0,0.35)"
        radius={parseFloat(region.radius)}
      />
    ))
  );
  
};

export default DisplayRZ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
