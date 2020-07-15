// Import React core components
import React from 'react';
import {Button, TextInput, View, Text, StyleSheet} from 'react-native';

//Import Formik for forms
import {Formik} from 'formik';

// Import for add user
import firestore from '@react-native-firebase/firestore';

export default function NewUserForm({setModalOpen, userUid, userName}) {
  function sendFirebaseInfo(age, gender, city, state, occupation) {
    firestore()
      .collection('Users')
      .doc(userUid)
      .set({
        name: userName,
        age: age,
        gender: gender,
        city: city,
        state: state,
        occupation: occupation,
        rzTime: 0,
      })
      .then(() => {
        console.log('User added!');
        setModalOpen(false);
      });
  }
  return (
    <View>
      <Formik
        initialValues={{
          age: '',
          gender: '',
          city: '',
          state: '',
          occupation: '',
        }}
        onSubmit={(values) => {
          console.log(values);
          sendFirebaseInfo(
            values.age,
            values.gender,
            values.city,
            values.state,
            values.occupation,
          );
        }}>
        {(props) => (
          <View>
            <TextInput
              placeholder="Age"
              onChangeText={props.handleChange('age')}
              value={props.values.age}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Gender"
              onChangeText={props.handleChange('gender')}
              value={props.values.gender}
              style={styles.input}
            />
            <TextInput
              placeholder="City"
              onChangeText={props.handleChange('city')}
              value={props.values.city}
              style={styles.input}
            />
            <TextInput
              placeholder="State"
              onChangeText={props.handleChange('state')}
              value={props.values.state}
              style={styles.input}
            />
            <TextInput
              placeholder="Occupation"
              onChangeText={props.handleChange('occupation')}
              value={props.values.occupation}
              style={styles.input}
            />
            <Button title="SUBMIT" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});
