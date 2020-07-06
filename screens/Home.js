import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";

const Home = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Home</Text>
        <Button 
            title='Map' 
            onPress={()=>
            navigation.push("Map", { name: "User Location and Red Zones Map"})
            }   
        />
        <Button 
            title='Open Drawer' 
            onPress={()=>
                navigation.toggleDrawer()}
        />
    </View>
    )
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});