import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Image, ScrollView, ActivityIndicator, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import * as types from '../interfaces';
const requests = require('../services/requests');

export default function LoginScreen(){ 
    const navigation = useNavigation();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const login = async () => {
        if((username == "")||(username==null)||(password=="")||(password==null)){
            Alert.alert("Preecha todos os campos!", "Favor preencher todos os campos para continuar.");
            return;
        }
        setLoading(true);

        const loginReq: types.LoginRequest = {
            email: username,
            password: password
        }
        requests.login(loginReq, (status: number, msg: string)=>{
            setLoading(false);
            if(status==200){
                // @ts-ignore
                navigation.navigate('Logado', { screen: 'Home' });
            }
            else Alert.alert("Atenção!", msg);
        });
    }

    const register = () =>{
        // @ts-ignore
        navigation.navigate('Deslogado', { screen: 'Register' });
    }

    return (
        <SafeAreaView style={style.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <View style={style.center}>
                    <Image resizeMode="contain" source={require('../../assets/logo_login.png')} style={style.logo}/>
                </View>
                <TextInput theme={inputTheme} underlineColor={Colors.colorText} selectionColor={Colors.colorPrimary} value={username} style={style.input} label="Usuário" onChangeText={username => setUsername(username)}/>
                <View style={style.separator}/>
                <TextInput theme={inputTheme} underlineColor={Colors.colorText} selectionColor={Colors.colorPrimary} secureTextEntry={true} style={style.input} label="Senha" value={password} onChangeText={password => setPassword(password)}/>
                
                <View style={style.separator}/>
                <Text style={style.txtCad}>
                    Não é cadastrado? 
                    <Text style={style.txtRed} onPress={register}>
                        Cadastre-se.
                    </Text>
                </Text>
                
                <TouchableOpacity style={style.btLogin} onPress={login}>
                    {loading ? 
                        (<ActivityIndicator size="large" color="#FFF" />) : 
                        (<Text style={style.txtLogin}>Login</Text>)
                    }
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}

//TextInput style
const inputTheme = { colors: {placeholder: Colors.colorText, text: Colors.colorText, primary: Colors.colorText, background: Colors.colorBackground}};

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
    input:{
        width: width, //280
        height: 55,
        fontSize: 18,
    },
    txtCad:{
        textAlign: "center",
        fontSize: 16,
        color: Colors.colorText,
        marginTop: 5,
    },
    btLogin:{
        backgroundColor: Colors.colorPrimary,
        width: width,
        height: 45,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo:{
        width: width-60,
        //height: 130
    },
    txtLogin:{
        textAlign: "center",
        fontSize: 18,
        color: Colors.colorText,
    },
    txtRed:{
        color: Colors.colorPrimary,
    }
});