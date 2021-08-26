import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Delivery } from '../interfaces';
import DeliveryContainer from '../components/DeliveryContainer';
const requests = require('../services/requests');

export default function HomeScreen() {
    const navigation: any = useNavigation();
    const [items, setItems] = useState<Delivery[]>([]);
    const [refreshing, setRefreshing] = useState(true);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            onRefresh();
        });

        return unsubscribe;
    }, [navigation]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        var data: Delivery[] = await requests.getDeliveries();
        setItems(data);
        setRefreshing(false);
    }, []);

    const newDelivery = () => {
        navigation.navigate("NewDelivery");
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {items.length || refreshing ? (
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            data={items}
                            renderItem={({ item }) =>
                                <DeliveryContainer delivery={item} onRefresh={onRefresh} />
                            }
                            keyExtractor={item => item._id}
                        />
                    ) : (
                        <View style={style.vwCenter}>
                            <Text style={style.txtEmpty}>Nenhuma viagem cadastrada</Text>
                            <TouchableOpacity style={style.btCad} onPress={newDelivery}>
                                <Text style={style.txtCad}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorBackground
    },
    txtEmpty: {
        color: Colors.colorText,
        fontSize: 18
    },
    btCad: {
        backgroundColor: Colors.colorPrimary,
        height: 45,
        marginTop: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtCad: {
        textAlign: "center",
        fontSize: 18,
        color: Colors.colorText,
    },
    vwCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});