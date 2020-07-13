/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
// import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {AuthContext} from '../contexts/AuthContext';

const SignIn = ({navigation}) => {
  const {
    signInAnonymous,
    signInWithEmail,
    signInWithGmail,
    // signInWithFacebook,
  } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Sign in Screen</Text>
      <Button
        title="Sign in With Email and Password"
        onPress={() => signInWithEmail()}
      />
      <Button title="Sign in Anonymous" onPress={() => signInAnonymous()} />
      <Button title="Sign in With Gmail" onPress={() => signInWithGmail()} />
      {/* <Button
        title="Sign in With Facebook"
        onPress={() => signInWithFacebook()}
      /> */}
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('Login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('Login is cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('user logged out')}
      /> */}
      <Button
        title="Create Account"
        onPress={() => navigation.push('CreateAccount')}
      />
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
});
