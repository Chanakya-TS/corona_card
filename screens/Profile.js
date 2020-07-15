// Import React core components
import React, {useContext, useEffect, useState} from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import {UserContext} from '../contexts/UserContext';

import firestore from '@react-native-firebase/firestore';


const Profile = () => {
    const [data, setData] = useState(null);
    const {user} = useContext(UserContext);
    useEffect(()=>{
        firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
            setData(documentSnapshot.data());
        })
    }, [])
    if (data) {
    return (
    <View style={styles.profileBar}>
        <Text style={styles.title}>NAME</Text>
        <View style={styles.entryBox}>
            <Text style={styles.entry}>{user.displayName}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>AGE</Text>
        <Text style={[styles.title, {marginLeft: 165}]}>GENDER</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <View style={[styles.entryBox, {width: '45%'}]}>
            <Text style={styles.entry}>{data.age}</Text>
        </View>
        <View style={[styles.entryBox, {width: '40%', }]}>
            <Text style={styles.entry}>{data.gender}</Text>
        </View>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>CITY</Text>
        <Text style={[styles.title, {marginLeft: 165}]}>STATE</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <View style={[styles.entryBox, {width: '45%'}]}>
            <Text style={styles.entry}>{data.city}</Text>
        </View>
        <View style={[styles.entryBox, {width: '40%'}]}>
            <Text style={styles.entry}>{data.state}</Text>
        </View>
        </View>
        
        <Text style={styles.title}>OCCUPATION</Text>
        <View style={styles.entryBox}>
            <Text style={styles.entry}>{data.occupation}</Text>
        </View>
        <View style={styles.rzBox}>
        <Text style={styles.rzMins}>RED ZONE EXPOSURE (Minutes)</Text>
        <View style={styles.rzMinsBox}>
          <Text style={styles.rzMinsBoxT}>{data.rzTime}</Text>
        </View>
        </View>
    </View>
    )
    } else {
    return (
        <View>
            <Text>LOADING</Text>
        </View>
    )
    }
}
export default Profile;

const styles = StyleSheet.create({
    profileBar: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#36ABFF',
        paddingTop: 5,
    },
    title: {
        margin: 15,
        marginBottom: 10,
        fontSize: 18,
        color: 'white',
        fontFamily: 'Spartan-SemiBold'
    },
    entryBox: {
        backgroundColor: '#77C6FF',
        marginHorizontal: 15,
        padding: 5,
        justifyContent: 'center',
    },
    entry: {
        fontFamily: 'Spartan-ExtraBold',
        color: 'white',
        fontSize: 24,
    },
    rzBox: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1,
    },
    rzMins: {
        alignSelf: 'center',
        paddingTop: 0,
        padding: 10,
        fontFamily: 'Spartan-Bold',
        fontSize: 18,
        color: 'white'
    },
    rzMinsBox: {
        backgroundColor: 'white',
        height: '55%',
        alignSelf: 'center',
        width: '40%',
        borderRadius: 10,
        justifyContent: 'center'
      },
      rzMinsBoxT: {
        alignSelf: 'center',
        fontFamily: 'Spartan-SemiBold',
        fontSize: 48,
        color: '#36ABFF',
      },
});