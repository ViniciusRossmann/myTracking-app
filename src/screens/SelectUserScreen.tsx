import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { User } from '../interfaces';
const requests = require('../services/requests');

export default function SelectUser() {
    const navigation: any = useNavigation();
    const [fullData, setFullData] = useState<User[]>([]);
    const [data, setData] = useState<User[]>(fullData);
    const [search, setSearch] = useState<string>('');
    const [refreshing, setRefreshing] = useState<boolean>(true);

    React.useEffect(() => {
        onRefresh();
    }, []);

    const setUsers = (users: User[]) => {
        setFullData(users);
        setData(users);
    }

    const select = (item: User) => {
        navigation.navigate('NewDelivery', { user: item })
    }

    const handleSearch = (text: string) => {
        setSearch(text);
        const formattedQuery = text.toLowerCase()
        var data: User[] = [];
        fullData.forEach(element => {
            if (contains(element.name, formattedQuery))
                data.push(element);
        });
        setData(data);
    }

    const contains = (name: string, query: string) => {
        if (name.toLowerCase().includes(query)) {
            return true;
        }
        return false;
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        const users = await requests.getUsers();
        setUsers(users);
        setRefreshing(false);
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <TextInput
                        theme={inputTheme}
                        underlineColor={Colors.colorText}
                        selectionColor={Colors.colorPrimary}
                        value={search}
                        style={style.input}
                        label="Pesquisar cliente"
                        onChangeText={search => { handleSearch(search) }}
                        right={<TextInput.Icon name={() => <Ionicons name="search-sharp" size={25} color={Colors.colorText} />} />}
                    />

                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={data}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={style.item} onPress={() => select(item)}>
                                <View>
                                    <Text style={style.txtIndex}>{item.name}</Text>
                                    <Text style={style.txtDetail}>{item.email}</Text>
                                </View>
                            </TouchableOpacity>
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

//estilos dos elementos da tela
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorBackground
    },
    txtIndex: {
        fontSize: 15,
        marginHorizontal: 10,
        color: Colors.colorText,
    },
    txtDetail: {
        fontSize: 13,
        marginHorizontal: 10,
        color: Colors.colorText,
    },
    item: {
        backgroundColor: Colors.colorStatusBar,
        marginHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 3,
        width: Layout.window.width * 0.9
    },
    input: {
        width: Layout.window.width * 0.9,
        height: 55,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 10
    }
});