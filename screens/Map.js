import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const Map = ({ route }) => (
    <View style={styles.container}>
        <Text>Map</Text>
        {route.params.name && <Text>{route.params.name}</Text>}
    </View>
    )
export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});