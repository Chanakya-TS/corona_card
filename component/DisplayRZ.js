/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Circle} from 'react-native-maps';

const DisplayRZ = ({regions}) => {
  console.log(regions);
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
