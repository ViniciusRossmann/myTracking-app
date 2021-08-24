import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Delivery } from '../interfaces';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { useNavigation } from '@react-navigation/native'

export default function DeliveryContainer(delivery: Delivery) {
    const navigation = useNavigation();

    const init = async () =>{
        //@ts-ignore
        navigation.navigate('Delivery', { delivery });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txtCaption}>{delivery.description}</Text>
            <Text style={styles.txtSub}>Cliente: {delivery.user.name}</Text>
            <Text style={styles.txtSub}>Status: {descStatus[delivery.status]}</Text>
            <TouchableOpacity style={styles.btInit} onPress={init}>
                <Text style={styles.txtInit}>Iniciar</Text>
                <Ionicons name="arrow-forward-circle" size={30} color={Colors.colorGreen} />
            </TouchableOpacity>
        </View>
    )
}

const descStatus: {[key: number]: string} = {
    0: 'Não iniciada',
    1: 'Em andamento',
    2: 'Finalizada',
    3: 'Cancelada'
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colorStatusBar,
        marginVertical: 10,
        width: Layout.window.width * 0.9,
    },
    txtInit: {
        color: Colors.colorText,
        alignSelf: 'center'
    },
    btInit: {
        flexDirection: 'row',
        alignContent: 'center',
        textAlign: 'center',
        borderWidth: 1
    },
    txtCaption: {
        color: Colors.colorText,
        fontSize: 18
    },
    txtSub: {
        color: Colors.colorText,
    }
});