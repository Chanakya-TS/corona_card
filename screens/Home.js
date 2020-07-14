import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { StateContext } from '../contexts/StateContext';

const Home = ({navigation}) => {
  const {safe, warning, danger} = useContext(StateContext);
  console.log('FROM HOME', safe, warning, danger);
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>
        Safe: {JSON.stringify(safe)}, Warning: {JSON.stringify(warning)}, Danger: {JSON.stringify(danger)}
      </Text>
      <Button
        title="Map"
        onPress={() =>
          navigation.push('Map', {name: 'User Location and Red Zones Map'})
        }
      />
      <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
