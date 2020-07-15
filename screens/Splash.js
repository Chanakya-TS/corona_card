import React from "react";
import { 
    View,
    Image,
    StyleSheet,
    ImageBackground,
    StatusBar
} from "react-native";


const Splash = (props) => (
    <View style={styles.container}>
        <StatusBar 
            backgroundColor = "#36ABFF"
        />
        <ImageBackground
            style={styles.stretch}
            source={require('../resources/images/splash_bg.png')}
        >
            <Image 
                style={styles.logo}
                source={require('../resources/images/logo.png')}
            />
        </ImageBackground>
    </View>
    )
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stretch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    logo: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        maxHeight: 300,
        maxWidth: 300,

    }
});