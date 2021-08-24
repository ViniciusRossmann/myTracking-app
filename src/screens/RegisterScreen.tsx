import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Image, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import * as types from '../interfaces';
const requests = require('../services/requests');

export default function RegisterScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const register = async () => {

    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>

                        <View style={style.header}>
                            <Text style={style.txtHeader}>
                                Cadastrar novo motorista:
                            </Text>
                        </View>
                        <View style={style.separator} />
                        <TextInput theme={inputTheme} underlineColor={Colors.colorText} selectionColor={Colors.colorPrimary} value={username} style={style.input} label="Nome" onChangeText={username => setUsername(username)} />
                        <View style={style.separator} />
                        <TextInput theme={inputTheme} underlineColor={Colors.colorText} selectionColor={Colors.colorPrimary} value={username} style={style.input} label="Email" onChangeText={username => setUsername(username)} />
                        <View style={style.separator} />
                        <TextInput theme={inputTheme} underlineColor={Colors.colorText} selectionColor={Colors.colorPrimary} secureTextEntry={true} style={style.input} label="Senha" value={password} onChangeText={password => setPassword(password)} />
                        <View style={style.separator} />
                        <TextInput theme={inputTheme} underlineColor={Colors.colorText} selectionColor={Colors.colorPrimary} secureTextEntry={true} style={style.input} label="Repetir Senha" value={password} onChangeText={password => setPassword(password)} />
                        <TouchableOpacity style={style.btLogin} onPress={register}>
                            {loading ?
                                (<ActivityIndicator size="large" color="#FFF" />) :
                                (<Text style={style.txtLogin}>Confirmar</Text>)
                            }
                        </TouchableOpacity>
                    </View>
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
    separator: {
        height: 20
    },
    container: {
        flex: 1,
        backgroundColor: Colors.colorBackground //3579b7
    },
    center: {
        alignItems: 'center'
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: width, //280
        height: 55,
        fontSize: 18,
    },
    txtCad: {
        textAlign: "center",
        fontSize: 18,
        color: Colors.colorText,
        marginTop: 20,
        marginBottom: 40,
    },
    btLogin: {
        backgroundColor: Colors.colorPrimary,
        width: width,
        height: 45,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width - 60,
        //height: 130
    },
    txtLogin: {
        textAlign: "center",
        fontSize: 18,
        color: Colors.colorText,
    },
    txtHeader: {
        fontSize: 18,
        color: Colors.colorText,
    },
    header: {
        width: width,
    }
});