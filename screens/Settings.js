// Import React core components
import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from "react-native";

// Import Auth context
import { AuthContext } from '../contexts/AuthContext';

const Settings = ({ navigation }) => {
    const { signOutAcc } = React.useContext(AuthContext);
    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={() =>(
          signOutAcc())
                }>
            <View style={styles.mapViewBut}>
              <Text style={styles.mapViewButText}>SIGN OUT</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
}
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
      mapViewBut: {
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: '#36ABFF',
        width: 200,
        borderRadius: 20,
        alignContent: 'center',
        justifyContent: 'center'
      },
      mapViewButText: {
        alignSelf: 'center',
        fontSize: 24,
        fontFamily: 'Spartan-SemiBold',
        color: 'white',
      }
});