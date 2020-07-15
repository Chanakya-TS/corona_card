/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { UserContext } from '../contexts/UserContext';

const NewUser = ({navigation}) => {
    const {user} = React.useContext(UserContext);
    const name = user.displayName;
    const [age, setAge] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [occupation, setOccupation] = React.useState(null);
    
    return (
        <View style={styles.container}>
        <Text>NewUser</Text>
        <Button title='DONE' onPress={()=>navigation.navigate('App')}/>
        </View>
    );
};
export default NewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
