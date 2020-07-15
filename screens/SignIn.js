// Import React core components
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

// Import context for Firebase Auth
import {AuthContext} from '../contexts/AuthContext';

const SignIn = () => {
  const { signInWithGmail } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Sign in Screen</Text>
      <Button title="Sign in With Gmail" onPress={() => signInWithGmail()} />
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
