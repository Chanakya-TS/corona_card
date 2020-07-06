import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";

const Splash = (props) => (
    <View style={styles.container}>
        <ActivityIndicator size="large" />
    </View>
    )
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});