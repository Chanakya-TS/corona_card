// Import React core components
import React from 'react';
import {View, Text, StyleSheet, Button, Image, ImageBackground, TouchableOpacity} from 'react-native';

// Import Auth context
import {AuthContext} from '../contexts/AuthContext';

const SignIn = () => {
  const {
    signInWithGmail,
  } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      {/* <Text>Sign in Screen</Text>
      <Button title="Sign in With Gmail" onPress={() => signInWithGmail()} /> */}
      <ImageBackground
        style={styles.stretch}
        source={require('../resources/images/signin_bg.png')}
      >
        <Image 
          style={styles.logo}
          source={require('../resources/images/logo.png')}
        />
        <View>
          <Image 
            style={styles.ico}
            source={require('../resources/images/google_ico.png')}
          />
          <TouchableOpacity onPress={() => signInWithGmail()}>
            <View style={styles.button}>
              <Text style={styles.butText}>SIGN IN WITH GOOGLE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  logo: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    maxHeight: 180,
    maxWidth: 180,
  },
  ico: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    
    justifyContent: 'center',
    marginTop: 150,
    maxHeight: 100,
    maxWidth: 100,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#36ABFF',
    maxHeight: 60,
    width: 300,
    borderRadius: 31,
  },
  butText: {
    fontFamily: 'Spartan-SemiBold',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
