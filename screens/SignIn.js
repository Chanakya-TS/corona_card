import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";

import { AuthContext } from '../contexts/AuthContext';

const SignIn = ({ navigation }) => {

    const { signInAnonymous, signInWithEmail, signInWithGmail } = React.useContext(AuthContext);
    return(
        <View style={styles.container}>
            <Text>Sign in Screen</Text>
            <Button title='Sign in With Email and Password' onPress={()=>signInWithEmail()}/>
            <Button title='Sign in Anonymous' onPress={()=> signInAnonymous()}/>
            <Button title='Sign in With Gmail' onPress={()=> signInWithGmail()}/>
            <Button title='Create Account' onPress={()=> navigation.push("CreateAccount")}/>
        </View>
    )
}
export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});