import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Image, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import * as types from '../interfaces';
import * as Location from 'expo-location';
const requests = require('../services/requests');

export default function DeliveryScreen() {
    const navigation = useNavigation();

    React.useEffect(() => {
        async function asyncTasks() {
            let statusForeground = (await Location.requestForegroundPermissionsAsync()).status;
            let statusBackground = (await Location.requestBackgroundPermissionsAsync()).status;
            if (statusForeground !== 'granted' || statusBackground !== 'granted') {
                Alert.alert("Atenção!", "É preciso permitir o acesso a sua localização para continuar!");
                //@ts-ignore
                navigation.navigate('Inicio');
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
        }

        asyncTasks()
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text>Teste</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

//elements width
const width = Layout.window.width * 0.8;

//stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorBackground
    },
});