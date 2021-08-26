import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Delivery } from '../interfaces';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { useNavigation } from '@react-navigation/native'
const requests = require('../services/requests');

type DeliveryContainerProps = {
    delivery: Delivery;
    onRefresh: Function;
}

export default function DeliveryContainer(props: DeliveryContainerProps) {
    const navigation: any = useNavigation();

    const init = async () => {
        navigation.navigate('Delivery', { delivery: props.delivery });
    }

    const cancel = async () => {
        Alert.alert(
            'Atenção!',
            'Deseja realmente cancelar a viagem?',
            [
                { text: "Não", style: 'cancel', onPress: () => { } },
                {
                    text: 'Sim',
                    style: 'destructive',
                    onPress: async () => {
                        await requests.updateDeliveryStatus(props.delivery._id, 3);
                        props.onRefresh();
                    }
                },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.txtCaption}>{props.delivery.description}</Text>
            <Text style={styles.txtSub}>Cliente: {props.delivery.user.name}</Text>
            <Text style={styles.txtSub}>Status: {descStatus[props.delivery.status]}</Text>
            {props.delivery.status <= 1 ? (
                <View style={styles.viewBtns}>
                    <View style={styles.viewBt}>
                        <TouchableOpacity style={styles.btCanc} onPress={cancel}>
                            <Ionicons name="close-circle" size={30} color={Colors.colorPrimary} />
                            <View style={styles.txtBt}>
                                <Text style={styles.txtInit}>Cancelar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewBt}>
                        <TouchableOpacity style={styles.btInit} onPress={init}>
                            <Ionicons name="arrow-forward-circle" size={30} color={Colors.colorGreen} />
                            <View style={styles.txtBt}>
                                <Text style={styles.txtInit}>{props.delivery.status == 0 ? "Iniciar" : "Continuar"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null }
        </View>
    )
}

const descStatus: { [key: number]: string } = {
    0: 'Não iniciada',
    1: 'Em andamento',
    2: 'Finalizada',
    3: 'Cancelada'
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colorStatusBar,
        marginVertical: 8,
        width: Layout.window.width * 0.9,
        padding: 5
    },
    txtInit: {
        color: Colors.colorText,
        alignSelf: 'center'
    },
    btInit: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.colorGreen,
        paddingHorizontal: 3
    },
    btCanc: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.colorPrimary,
        paddingHorizontal: 3
    },
    txtCaption: {
        color: Colors.colorText,
        fontSize: 18
    },
    txtSub: {
        color: Colors.colorText,
    },
    viewBtns: {
        flexDirection: 'row',
    },
    viewBt: {
        width: '50%',
        paddingHorizontal: 4
    },
    txtBt: {
        flex: 1, 
        alignSelf: 'center'
    }
});