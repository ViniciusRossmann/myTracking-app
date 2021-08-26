import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import * as types from '../interfaces';
const requests = require('../services/requests');

export default function RegisterScreen() {
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');
    const [formData, setFormData] = useState<types.Driver>({
        email: '',
        name: '',
        password: ''
    });

    const register = async () => {
        if (!validateData()) return;
        setLoading(true);
        requests.newDriver(formData, (status: number, msg: string)=>{
            if (status == 201){ //created
                requests.login({email: formData.email, password: formData.password}, (status: number, msg: string)=>{
                    setLoading(false);
                    if(status==200){
                        navigation.navigate('Logado', { screen: 'Home' });
                    }
                    else Alert.alert("Atenção", msg);
                });
            }
            else {
                setLoading(false);
                Alert.alert("Atenção", msg);
            }
        });
    }

    const validateData = (): boolean =>{
        if (formData.password !== passwordRepeat){
            Alert.alert("Atenção", "As senhas informadas não conferem!");
            return false;
        }
        if (formData.name==="" || formData.email==="" || formData.password===""){
            Alert.alert("Atenção", "Preencha todos os campos!");
            return false;
        }
        if (!validateEmail(formData.email)){
            Alert.alert("Atenção", "Informe um endereço de email válido!");
            return false;
        }
        return true;
    }

    const validateEmail = (email: string): boolean => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleInputChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        })
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

                        <TextInput 
                            theme={inputTheme} 
                            underlineColor={Colors.colorText} 
                            selectionColor={Colors.colorPrimary} 
                            value={formData.name} 
                            style={style.input} 
                            label="Nome" 
                            onChangeText={name => handleInputChange('name', name)} 
                        />

                        <TextInput 
                            theme={inputTheme} 
                            underlineColor={Colors.colorText} 
                            selectionColor={Colors.colorPrimary} 
                            value={formData.email} 
                            style={style.input} 
                            label="Email" 
                            onChangeText={email => handleInputChange('email', email)} 
                        />

                        <TextInput 
                            theme={inputTheme} 
                            underlineColor={Colors.colorText} 
                            selectionColor={Colors.colorPrimary} 
                            secureTextEntry={true} 
                            style={style.input} 
                            label="Senha" 
                            value={formData.password} 
                            onChangeText={password => handleInputChange('password', password)} 
                        />

                        <TextInput 
                            theme={inputTheme} 
                            underlineColor={Colors.colorText} 
                            selectionColor={Colors.colorPrimary} 
                            secureTextEntry={true} 
                            style={style.input} 
                            label="Repetir Senha" 
                            value={passwordRepeat} 
                            onChangeText={passwordRepeat => setPasswordRepeat(passwordRepeat)} 
                        />
                        
                        <TouchableOpacity style={style.btCad} onPress={register}>
                            {loading ?
                                (<ActivityIndicator size="large" color="#FFF" />) :
                                (<Text style={style.txtCad}>Confirmar</Text>)
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
    container: {
        flex: 1,
        backgroundColor: Colors.colorBackground //3579b7
    },
    input: {
        width: width, //280
        height: 55,
        fontSize: 18,
        marginTop: 20
    },
    btCad: {
        backgroundColor: Colors.colorPrimary,
        width: width,
        height: 45,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtCad: {
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