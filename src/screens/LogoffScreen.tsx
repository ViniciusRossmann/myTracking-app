import React from 'react';
import { View, Text, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/Colors';
const requests = require('../services/requests');

export default function LogoffScreen() {
    const navigation: any = useNavigation();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await requests.logout();
            try {
                await AsyncStorage.removeItem('@myTracking:loggedin');
                await AsyncStorage.removeItem('@myTracking:x-access-token');
                await AsyncStorage.removeItem('@myTracking:x-refresh-token');
                await AsyncStorage.removeItem('@myTracking:user-name');
            } catch (e){
                throw new Error(e);
            } finally{
                navigation.navigate("Deslogado", {screen: "Login"});
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={style.container}>
            <Text style={style.text}>Saindo</Text>
            <ActivityIndicator size="large" color={Colors.colorPrimary} />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: Colors.colorBackground
    },
    text: {
        color: Colors.colorText, 
        fontSize: 25
    }
});