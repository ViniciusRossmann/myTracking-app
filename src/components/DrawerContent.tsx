import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import Constants from "expo-constants";

export default function CustomDrawerContent() {
    const navigation: any = useNavigation();
    const [username, setUsername] = useState<string>('Username');

    async function retrieveData() {
        try {
            const name = await AsyncStorage.getItem('@myTracking:user-name');
            setUsername(name || 'Username');
        } catch (error) {
            console.error(error);
        }
    };
    retrieveData();

    return (
        <ScrollView style={styles.backgroundDrawer}>
            <View style={styles.headerDrawer}>
                <Text style={{ fontSize: 20, color: Colors.colorText, marginTop: 25 }}>{username}</Text>
            </View>
            <View style={styles.backgroundOptions}>

                <TouchableOpacity style={styles.itemDrawer} onPress={() => {
                    navigation.navigate("Home");
                }}>
                    <Ionicons name="home" size={25} color={Colors.corIconNav} />
                    <Text style={styles.labelDrawer}>Início</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemDrawer} onPress={() => {
                    navigation.navigate("Sair");
                }}>
                    <Ionicons name="md-exit" size={25} color={Colors.corIconNav} />
                    <Text style={styles.labelDrawer}>Sair</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    backgroundDrawer: {
        flex: 1,
        backgroundColor: Colors.colorBackground,
    },
    headerDrawer: {
        backgroundColor: Colors.colorStatusBar,
        height: 100,
        padding: 10,
        justifyContent: 'center',
    },
    itemDrawer: {
        flexDirection: 'row',
        backgroundColor: Colors.colorBackground,
        opacity: 20,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        paddingVertical: 15,
    },
    labelDrawer: {
        marginLeft: 15,
        color: Colors.corIconNav,
        fontSize: 18,
    },
    backgroundOptions: {
        backgroundColor: Colors.colorBackground,
        height: (Layout.window.height - (120 + Constants.statusBarHeight)),
    }
});