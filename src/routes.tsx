import React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './components/DrawerContent';
import Colors from './constants/Colors';
import { RouterProps } from './interfaces';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import LogoffScreen from './screens/LogoffScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import NewDeliveryScreen from './screens/NewDeliveryScreen';
import SelectUserScreen from './screens/SelectUserScreen';
import RegisterScreen from './screens/RegisterScreen';

const StackHome = createStackNavigator();
function StackNavHome() {
    const navigation = useNavigation();
    return (
        <StackHome.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: Colors.colorStatusBar }, headerTintColor: Colors.colorText }}>
            <StackHome.Screen name="Inicio" component={HomeScreen}
            options={{
                headerTitle: 'Suas viagens', 
                headerLeft: () => (
                    //@ts-ignore
                    <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                        <View style={{ paddingLeft: 20, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="md-menu" size={27} color={Colors.colorText} />
                        </View>
                    </TouchableWithoutFeedback>
                ),
                headerRight: () => (
                    //@ts-ignore
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('NewDelivery')}>
                        <View style={{ paddingRight: 20, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="add" size={27} color={Colors.colorText} />
                        </View>
                    </TouchableWithoutFeedback>
                )
            }} />
            <StackHome.Screen name="Delivery" options={{headerTitle: "Viagem"}} component={DeliveryScreen} />
            <StackHome.Screen name="NewDelivery" options={{headerTitle: "Nova Viagem"}} component={NewDeliveryScreen} />
            <StackHome.Screen name="SelectUser" options={{headerTitle: "Selecionar cliente"}} component={SelectUserScreen} />
        </StackHome.Navigator>
    );
}

const Drawer = createDrawerNavigator();
function drawerNav() {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent />} screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Home" component={StackNavHome} />
            <Drawer.Screen name="Sair" component={LogoffScreen} />
        </Drawer.Navigator>
    )
}

const StackUnlogged = createStackNavigator();
function NavigationUnlogged(props: RouterProps) {
    return (
        <StackUnlogged.Navigator initialRouteName={props.initialRoute} screenOptions={{ headerStyle: { backgroundColor: Colors.colorStatusBar }, headerTintColor: Colors.colorText }}>
            <StackUnlogged.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
            <StackUnlogged.Screen name="Register" options={{headerTitle: 'Cadastro'}} component={RegisterScreen} />
        </StackUnlogged.Navigator>
    );
}


const Stack = createStackNavigator();
export default function Navigation(props: RouterProps) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={props.initialRoute} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Deslogado" component={NavigationUnlogged} />
                <Stack.Screen name="Logado" component={drawerNav} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}