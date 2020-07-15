// Import React core components
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

// Import contexts
import {StateContext} from '../contexts/StateContext';
import {UserContext} from '../contexts/UserContext';

import NewUserForm from './NewUserForm';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const {safe, warning, danger} = useContext(StateContext);
  const {user, isNewUser} = useContext(UserContext);
  const name = user.displayName;
  const [rzMins, setRzMins] = useState(0);
  useEffect(() => {
    firestore()
    .collection('Users')
    .doc(user.uid)
    .get()
    .then(documentSnapshot => documentSnapshot.get('rzTime'))
    .then((currentRzTime) => {
      setRzMins(currentRzTime);
    })
  })
  console.log("FROM HOME isnewuser: ", isNewUser)
  const [modalOpen, setModalOpen] = useState(isNewUser);
  return (
    <View style={styles.container}>
      <Modal visible={modalOpen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <NewUserForm
              setModalOpen={setModalOpen}
              userUid={user.uid}
              userName={user.displayName}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.nameHeader}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.rzMins}>RED ZONE EXPOSURE (Minutes)</Text>
        <View style={styles.rzMinsBox}>
          <Text style={styles.rzMinsBoxT}>{rzMins}</Text>
        </View>
        <Text style={styles.status}>LOCATION RISK</Text>
        {danger ? (
          <View style={styles.statusBoxD}>
            <Text style={styles.dangerText}>DANGER</Text>
          </View>
        ) : (
          warning ? (
            <View style={styles.statusBoxW}>
              <Text style={styles.warningText}>WARNING</Text>
            </View>
          ) : (
            <View style={styles.statusBoxS}>
              <Text style={styles.safeText}>SAFE</Text>
            </View>
          )
        )}
        
        <View style={styles.mapViewBar}>
          <TouchableOpacity onPress={() =>
          navigation.push('Map', {name: 'User Location and Red Zones Map'})
        }>
            <View style={styles.mapViewBut}>
              <Text style={styles.mapViewButText}>VIEW MAP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  nameHeader: {
    width: '100%',
    marginVertical: 20,
    backgroundColor: '#77C6FF'
  },
  nameText: {
    padding: 10,
    fontFamily: 'Spartan-ExtraBold',
    color: 'white',
    fontSize: 24,
  },
  body: {
    backgroundColor: '#36ABFF',
    height: '100%',
    width: '100%',
  },
  rzMins: {
    alignSelf: 'center',
    padding: 10,
    fontFamily: 'Spartan-Bold',
    fontSize: 18,
    color: 'white'
  },
  rzMinsBox: {
    backgroundColor: 'white',
    height: '25%',
    alignSelf: 'center',
    width: '40%',
    borderRadius: 25,
    justifyContent: 'center'
  },
  rzMinsBoxT: {
    alignSelf: 'center',
    fontFamily: 'Spartan-SemiBold',
    fontSize: 48,
    color: '#36ABFF',
  },
  status: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 40,
    fontFamily: 'Spartan-ExtraBold',
    color: 'white',
  },
  statusBoxS: {
    backgroundColor: '#77C6FF',
    width: '80%',
    height: '20%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 20,
  },
  safeText: {
    alignSelf: 'center',
    fontSize: 80,  
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Spartan-ExtraBold'
  },
  statusBoxD: {
    backgroundColor: '#FF3636',
    width: '80%',
    height: '20%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 20,
  },
  dangerText: {
    alignSelf: 'center',
    fontSize: 55,  
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Spartan-ExtraBold'
  },
  statusBoxW: {
    backgroundColor: '#ff824d',
    width: '80%',
    height: '20%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 20,
  },
  warningText: {
    alignSelf: 'center',
    fontSize: 47,  
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Spartan-ExtraBold'
  },
  mapViewBar: {
    marginTop: 20,
    height: '10%',
    backgroundColor: '#77C6FF',
    alignContent: 'center',
  },
  mapViewBut: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    height: '65%',
    width: '50%',
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  mapViewButText: {
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: 'Spartan-SemiBold',
    color: '#36ABFF',
  }
});
