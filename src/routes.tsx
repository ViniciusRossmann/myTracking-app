import React from 'react';
import { View, Text } from 'react-native'
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


const StackHome = createStackNavigator();
function StackNavHome() {
    const navigation = useNavigation();

    return (
        <StackHome.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: Colors.colorStatusBar }, headerTintColor: Colors.colorText }}>
            <StackHome.Screen name="Inicio" component={HomeScreen}
            options={{
                headerTitle: 'Home', 
                headerLeft: () => (
                    //@ts-ignore
                    <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                        <View style={{ paddingHorizontal: 20, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="md-menu" size={27} color={Colors.colorText} />
                        </View>
                    </TouchableWithoutFeedback>
                )
            }} />
            <StackHome.Screen name="Delivery" options={{headerTitle: "Viagem"}} component={DeliveryScreen} />
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

const Stack = createStackNavigator();
export default function Navigation(props: RouterProps) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={props.initialRoute} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Deslogado" component={LoginScreen} />
                <Stack.Screen name="Logado" component={drawerNav} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}