import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper';
import * as types from '../interfaces';
import { Delivery } from '../interfaces';
const requests = require('../services/requests');

export default function NewDeliveryScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [delivery, setDelivery] = useState<types.NewDelivery>({
        description: '',
        user: ''
    });

    const createDelivery = async () =>{
        setLoading(true);
        await requests.newDelivery(delivery, (status: number, msg: string)=>{
            setLoading(false);
            Alert.alert("Atenção", msg);
            if (status==201) {
                //@ts-ignore
                navigation.navigate('Inicio');
            }
        });
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput theme={inputTheme} underlineColor={Colors.colorText} selectionColor={Colors.colorPrimary} value={delivery.description} style={style.input} label="Descrição" onChangeText={description => setDelivery({ description, user: delivery.user })} />
                    <View style={style.separator} />
                    <TextInput theme={inputTheme} underlineColor={Colors.colorText} selectionColor={Colors.colorPrimary} value={delivery.user} style={style.input} label="Cliente" onChangeText={user => setDelivery({ user, description: delivery.description })} />

                    <TouchableOpacity style={style.btLogin} onPress={createDelivery}>
                        {loading ?
                            (<ActivityIndicator size="large" color="#FFF" />) :
                            (<Text style={style.txtLogin}>Cadastrar</Text>)
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

//TextInput style
const inputTheme = { colors: { placeholder: Colors.colorText, text: Colors.colorText, primary: Colors.colorText, background: Colors.colorBackground } };

//elements width
const width = Layout.window.width * 0.8;

//stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorBackground //3579b7
    },
    input: {
        width: width, //280
        height: 55,
        fontSize: 18,
    },
    separator: {
        height: 20
    },
    btLogin:{
        backgroundColor: Colors.colorPrimary,
        width: width,
        height: 45,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtLogin:{
        textAlign: "center",
        fontSize: 18,
        color: Colors.colorText,
    },
});