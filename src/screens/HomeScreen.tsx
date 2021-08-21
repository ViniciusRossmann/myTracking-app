import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Delivery } from '../interfaces';
import DeliveryContainer from '../components/DeliveryContainer';
const requests = require('../services/requests');

export default function HomeScreen() {
    const navigation = useNavigation();
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

    const newDelivery = () =>{
        //@ts-ignore
        navigation.navigate("NewDelivery");
    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView  horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={items}
                        renderItem={({ item }) =>
                            <DeliveryContainer {...item}/>
                        }
                        keyExtractor={item => item._id}
                    />
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
    }
});