import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Image, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { StackScreenProps } from '@react-navigation/stack';
import * as types from '../interfaces';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import MapView, {
    Callout,
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";

const requests = require('../services/requests');
const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

type Params = {
    delivery: types.Delivery;
}
type RootStackParamList = {
    params: Params;
};
type Props = StackScreenProps<RootStackParamList>;

type TaskData = {
    locations: types.Location[];
}

export default function DeliveryScreen({ route, navigation }: Props) {
    const [delivery, setDelivery] = useState<types.Delivery>(route.params.delivery);
    const [region, setRegion] = useState<Region>();

    TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data, error }) => {
        if (error) {
            console.error(error);
            return;
        }
        try {
            //@ts-ignore
            let location = data.locations[data.locations.length - 1]; //send the last location
            if (location) {
                await requests.updateDeliveryLocation(delivery._id, location);
                let latitude = location.coords.latitude;
                let longitude = location.coords.longitude;
                setRegion({ latitude, longitude, latitudeDelta: 100, longitudeDelta: 100 });
            }
        } catch (err) {
            console.error(err);
        }
    });

    React.useEffect(() => {
        async function asyncTasks() {
            let statusForeground = (await Location.requestForegroundPermissionsAsync()).status;
            let statusBackground = (await Location.requestBackgroundPermissionsAsync()).status;
            if (statusForeground !== 'granted' || statusBackground !== 'granted') {
                Alert.alert("Atenção!", "É preciso permitir o acesso a sua localização para continuar!");
                //@ts-ignore
                navigation.navigate('Inicio');
            }
            if (! await Location.hasServicesEnabledAsync()) {
                Alert.alert("Atenção!", "É preciso ativar o serviço de localização do dispositivo para continuar!");
                //@ts-ignore
                navigation.navigate('Inicio');
            }

            //change status to 'Em andamento'
            if (delivery.status != 1) {
                await requests.updateDeliveryStatus(delivery._id, 1);
            }

            //start location update
            Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
                accuracy: Location.Accuracy.Highest,
                distanceInterval: 1, // minimum change betweens updates
                deferredUpdatesInterval: 1000, // minimum interval between updates
                foregroundService: {
                    notificationTitle: 'Rastreando viagem',
                    notificationBody: 'Volte para o aplicativo para finalizar.',
                },
            });
        }

        asyncTasks()
    }, []);

    const endDelivery = async () => {
        //stop location update
        Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then((isStarted) => {
            if (isStarted) {
                Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
            }
        });
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>

                        <MapView style={style.map} region={region}>

                            <Marker
                                key={delivery._id}
                                //image={{ uri: "" }}
                                calloutAnchor={{
                                    x: 2.9,
                                    y: 0.8,
                                }}
                                coordinate={{
                                    latitude: region?.latitude || 0,
                                    longitude: region?.longitude || 0,
                                }}
                            />

                        </MapView>

                        <TouchableOpacity style={style.btEnd} onPress={endDelivery}>
                            <Text style={style.txtEnd}>Finalizar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

//stylesheet
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorBackground
    },
    map: {
        width: Layout.window.width,
        height: '100%'
    },
    btEnd: {
        backgroundColor: Colors.colorPrimary, 
        paddingHorizontal: 30,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 20, 
        //alignSelf: 'center'
        right: 20,
    },
    txtEnd: {
        color: Colors.colorText, 
        fontSize: 18 
    }
});