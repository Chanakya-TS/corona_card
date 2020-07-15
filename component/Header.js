import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function Header({ title }) {
    return (
        <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        maxWidth: '100%',
        height: '70%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    headerText: {
        fontFamily: 'Spartan-SemiBold',
        fontSize: 24,
        color: '#36ABFF',
        paddingLeft: 15,
        paddingRight: 15, 
    },
    headerBar: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    ico: {
        height: 40,
        width: 40,
        position: 'absolute',
        right: 150, 
    }
})