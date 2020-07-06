import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

import { AuthContext } from '../contexts/AuthContext';


const CreateAccount = (props) => {
    const { signUpWithEmail } = React.useContext(AuthContext);
    return(
        <View style={styles.container}>
            <Text>CreateAccount</Text>
            <Button 
                title='Sign Up With Email and Password' 
                onPress={()=> signUpWithEmail()}
            />
        </View>
    )
}
export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});