import api from './api';
import * as types from '../interfaces';
import { Alert } from 'react-native';
import * as RootNavigation from '../helpers/RootNavigation';
import { AxiosResponse } from 'axios';
import { AsyncStorage } from 'react-native';

async function getHeaders(withAuth: boolean){
    if (!withAuth) return { headers: { 'Content-Type': 'application/json' }};

    var accessToken, refreshToken;
    try{
        accessToken = await AsyncStorage.getItem('@myTracking:x-access-token');
        refreshToken = await AsyncStorage.getItem('@myTracking:x-refresh-token');
    } catch (e){
        throw new Error(e);
    }

    return {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken,
            'x-refresh-token': refreshToken
        }
    }
}

async function verifyAuthentication(res: AxiosResponse){
    if (res.status == 401){ //unauthorized
        await exit();
        return;
    }

    const newToken = res.headers['x-access-token'];
    if (newToken){
        await AsyncStorage.setItem('@myTracking:x-access-token', newToken);
    }
}

async function exit() {
    try {
        await AsyncStorage.removeItem('@myTracking:loggedin');
        await AsyncStorage.removeItem('@myTracking:x-access-token');
        await AsyncStorage.removeItem('@myTracking:x-refresh-token');
        await AsyncStorage.removeItem('@myTracking:user-name');
    } catch (e){
        throw new Error(e);
    } finally{
        Alert.alert("Erro de autenticação!", "Favor fazer login novamente.");
        RootNavigation.navigate('Deslogado', {screen: "Login"});
    }
}

async function post(route: string, data: Object, withAuth: boolean): Promise<AxiosResponse> {
    var res; 
    try{
        res = await api.post(route, data, await getHeaders(withAuth));
    } catch(error){
        res = error.response;
    }
    if (withAuth) verifyAuthentication(res);
    return res;
}

async function get(route: string, withAuth: boolean): Promise<AxiosResponse> {
    var res; 
    try{
        res = await api.get(route, await getHeaders(withAuth));
    } catch(error){
        res = error.response;
    }
    if (withAuth) verifyAuthentication(res);
    return res;
}


async function login(loginReq: types.LoginRequest, callback: (status: number, msg: string) => void){
    const res = await post('driver/authentication', loginReq, false);

    if (res.status == 200){
        try{
            await AsyncStorage.setItem("@myTracking:loggedin", "true");
            await AsyncStorage.setItem("@myTracking:x-access-token", res.data.accessToken);
            await AsyncStorage.setItem("@myTracking:x-refresh-token", res.data.refreshToken);
            await AsyncStorage.setItem("@myTracking:user-name", res.data.driver.name);
        } catch (e){
            throw new Error(e);
        }
    }

    callback(res.status || 0 , res.data?.error || "Erro ao tentar efetuar login.");
}

async function logout(){
    await get('/driver/logoff', true);
}

async function getDeliveries(): Promise<types.Delivery[]>{
    const res = await get('/driver/deliveries', true);
    if (res.data?.msg) return [];
    return res.data || [];
}

async function updateDeliveryLocation(id: string, location: types.Location): Promise<boolean>{
    const res = await post(`/delivery/${id}`, { location }, true);
    return res.status == 200;
}

async function updateDeliveryStatus(id: string, status: number): Promise<boolean>{
    const res = await post(`/delivery/${id}`, { status }, true);
    return res.status == 200;
}

async function getDelivery(id: string): Promise<types.Delivery | null>{
    const res = await get(`/driver/delivery/${id}`, true);
    if (res.data?.msg) return null;
    return res.data || null;
}

async function newDelivery(newDelivery: types.NewDelivery, callback: (status: number, msg: string) => void){
    const res = await post(`/delivery`, newDelivery, true);
    callback(res.status || 0, res.data?.msg || res.data?.error || "Erro ao tentar cadastrar viagem.");
}

async function getUsers(): Promise<types.Delivery[]>{
    const res = await get('/users', true);
    if (res.data?.msg) return [];
    return res.data || [];
}

async function newDriver(driver: types.Driver, callback: (status: number, msg: string) => void){
    const res = await post('/driver/register', driver, false);
    callback(res.status || 0 , res.data?.error || "Erro ao tentar efetuar cadastro.");
}

export{
    login,
    logout,
    getDeliveries,
    getDelivery,
    updateDeliveryLocation,
    updateDeliveryStatus,
    newDelivery,
    getUsers,
    newDriver
}