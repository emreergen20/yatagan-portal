import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../src/NavigationService.js';

class AuthStore {
    @observable token = null;
    @observable userid = null;
    @observable udata = [];

@action async saveToken(token, uid){
    try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('uid', uid);

        await this.setupAuth();
    }catch (e) {
    console.log(e);
    }
}



@action async setupAuth(){
    await this.getidtoken();

}

    @action async getidtoken(){
    try {
        const uid = await AsyncStorage.getItem('uid');
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            NavigationService.navigate('Auth');
            return false;
        }

        this.userid = uid;
        this.token = token;
        NavigationService.navigate('App')
    }catch (e) {
        console.log(e);
    }
    }
    @action async getUserId(){
        try {
             //await AsyncStorage.removeItem('uid');
            const uid = await AsyncStorage.getItem('uid');
            if (!uid) {
                NavigationService.navigate('Auth');
                return false;
            }
            this.userid = uid;
            NavigationService.navigate('App')
        }catch (e) {
            console.log(e);
        }
    }
@action async getToken(){
    try {
      //await AsyncStorage.removeItem('token');
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            NavigationService.navigate('Auth');
            return false;
        }
        this.token = token;
        NavigationService.navigate('App')
    }catch (e) {
    console.log(e);
    }
}
    @action async Logout(){
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('uid');
            this.token = null;
            this.uid = null;
            await this.setupAuth();
        }catch (e) {
            console.log(e);
        }
    }

}
export default new AuthStore();
