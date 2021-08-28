import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { TextInput } from 'react-native-paper';
import * as types from '../interfaces';
import { StackScreenProps } from '@react-navigation/stack';
const requests = require('../services/requests');

type Params = {
    user?: types.User;
}
type RootStackParamList = {
    params: Params;
};
type Props = StackScreenProps<RootStackParamList>;

export default function NewDeliveryScreen({ route, navigation }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [delivery, setDelivery] = useState<types.NewDelivery>({
        description: '',
        user: ''
    });

    React.useEffect(() => {
        if (route.params?.user) {
          setUserName(route.params.user.name);
          setDelivery({ user: route.params.user._id, description: delivery.description });
        }
    }, [route.params?.user]);

    const createDelivery = async () =>{
        setLoading(true);
        await requests.newDelivery(delivery, (status: number, msg: string)=>{
            setLoading(false);
            if (status==201) {
                //@ts-ignore
                navigation.navigate('Inicio');
            }
            else {
                Alert.alert("Atenção", msg);
            }
        });
    }

    const selectUser= () => {
        //@ts-ignore
        navigation.navigate('SelectUser');
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    
                    <View style={style.header}>
                        <Text style={style.txtHeader}>
                            Cadastrar nova viagem:
                        </Text>
                    </View>

                    <View style={style.separator} />

                    <TextInput 
                        theme={inputTheme} 
                        underlineColor={Colors.colorText} 
                        selectionColor={Colors.colorPrimary} 
                        value={delivery.description} 
                        style={style.input} 
                        label="Descrição" 
                        onChangeText={description => setDelivery({ description, user: delivery.user })} 
                    />
                    
                    <View style={style.separator} />

                    <TextInput 
                        theme={inputTheme} 
                        underlineColor={Colors.colorText} 
                        selectionColor={Colors.colorPrimary} 
                        value={userName} 
                        style={style.input}
                        label="Cliente" 
                        onFocus={selectUser}
                    />

                    <TouchableOpacity style={style.btCad} onPress={createDelivery}>
                        {loading ?
                            (<ActivityIndicator size="large" color="#FFF" />) :
                            (<Text style={style.txtCad}>Cadastrar</Text>)
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
    btCad:{
        backgroundColor: Colors.colorPrimary,
        width: width,
        height: 45,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtCad:{
        textAlign: "center",
        fontSize: 18,
        color: Colors.colorText,
    },
    txtHeader:{
        fontSize: 18,
        color: Colors.colorText,
    },
    header: {
        width: width,
    }
});