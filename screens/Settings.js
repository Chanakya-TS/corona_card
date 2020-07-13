/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";

import { AuthContext } from '../contexts/AuthContext';

const Settings = ({ navigation }) => {
    const { signOutAcc } = React.useContext(AuthContext);
    return(
        <View style={styles.container}>
            <Text>Settings</Text>
            <Button 
                title="Open Drawer" 
                onPress={()=>
                    navigation.toggleDrawer()}
            />
            <Button 
                title="Sign Out" 
                onPress={()=>
                    signOutAcc()}
            />
        </View>
    )
}
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});