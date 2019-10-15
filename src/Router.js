import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import HaberlerPage from './Haberler/Haberler';
import HaberDetail from './Detail/HaberDetail';
import GonderiDetail from './Detail/GonderiDetail';
// First page(login-register-registermore)
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import AuthLoading from './pages/Loading/AuthLoading';
import RegisterMorePage from './pages/Register/RegisterMore';
// Pages
import HomePage from './pages/Home/Home';


import Contacts from './pages/Contacts';
import ContactDetail from './pages/ContactDetail';
import Profilbutton from './components/Profilbutton';
import ProfilPage from './Profil/Profil';
import SettingsModal from './components/SettingsModal';
import AyarlarListPage from './Ayarlar/AyarlarList';
import ProfilAyarlariPage from './Ayarlar/ProfilAyarlari';
import DrawerMenu from './components/DrawerMenu';
import LogoutButton from './components/LogoutButton';
import HeaderProfilAvatar from './components/HeaderProfilAvatar';
import HaberEkle from './Ekle/HaberEkle';
import DuyurularPage from './Duyurular/Duyurular';
import GonderiEkle from './Ekle/GonderiEkle'

import {Image} from '@shoutem/ui';
import {StyleSheet, Text} from 'react-native';

const HaberlerStack = createStackNavigator({
    Haberler: {
        screen: HaberlerPage,
    },
    HaberDetail: {
        screen: HaberDetail,
    },
    HaberEkle: {
        screen: HaberEkle,
    },
}, {
    headerMode: 'none',
});
const DuyuruStack = createStackNavigator({
    Duyurular: {
        screen: DuyurularPage,
    },
}, {
    headerMode: 'none',
});

const HomeStack = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Icon name="home" size={22} color={tintColor}/>),

            title: 'Yatagan Portal',
            headerStyle: {
                borderBottomColor: 'black',
            },
        },
    },
    Haberler: {
        screen: HaberlerStack,
        navigationOptions: {
            drawerLabel: 'Haberler',
        },
    },

    HaberDetail: {
        screen: HaberDetail,
    },
    HaberEkle: {
        screen: HaberEkle,
    },
    Duyurular: {
        screen: DuyuruStack,
        navigationOptions: {
            title: 'Duyurular ve İlanlar',
        },
    },
});
const ContactStack = createStackNavigator({
    Contacts: {
        screen: Contacts,
        navigationOptions: {
            title: 'Contacts',
        },
    },
    ContactDetail: {
        screen: ContactDetail,
    },
});
const ProfilAyarlariStack = createStackNavigator({

        ProfilAyarlari:{
            screen:ProfilAyarlariPage
        }
    }
);
const AyarlarStack = createStackNavigator({
        AyarlarList: {
            screen:AyarlarListPage,
        },
        ProfilAyarlari:{
            screen:ProfilAyarlariStack
        }
    }
);
const ProfilStack = createStackNavigator({
    Profil: {
        screen:ProfilPage,
    },
    GonderiDetail: {
        screen: GonderiDetail,
    },
    Ayarlar: {
        screen:AyarlarStack,
    }
});

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Icon name="home" size={22} color={tintColor}/>),
        },
    },
    Contacts: {
        screen: ContactStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Icon name="users" size={22} color={tintColor}/>),
        },
    },

    GonderiEkle: {
        screen: GonderiEkle,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Image
                style={styles.modalAvatar2}
                styleName="medium-avatar"
                source={require('../src/assets/plus--v1.png')}
            />),
        },
    },

    Contacts3: {
        screen: ContactStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Icon name="users" size={22} color={tintColor}/>),
        },
    },
    Profil: {
        screen: ProfilStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<Image
                style={styles.modalAvatar}
                styleName="medium-avatar"

                source={{uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-2.png'}}
            />),
        },
    },
}, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#f8f8f8',
        inactiveTintColor: '#586589',
        style: {
            backgroundColor: '#171f33',
        },
    },
    initialRouteName: 'Home',
});


const DrawerNavigator = createDrawerNavigator({
    Tabs: {
        screen: TabNavigator,
    },

}, {
    contentComponent: DrawerMenu,
});
const AppMenu = createStackNavigator({
        Register: {
            screen: RegisterPage,
        },
        RegisterMorePage: {
            screen: RegisterMorePage,
        },
        Login: {
            screen: LoginPage,
        },

    },
    {
        initialRouteName: 'Register',
    });

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: {
            screen: AuthLoading,
        },
        App: {
            screen: DrawerNavigator,
        },

        Auth: AppMenu,
    },
    {
        initialRouteName: 'AuthLoading',
    },
);


export default createAppContainer(SwitchNavigator);
const styles = StyleSheet.create({
    modalAvatar: {
        height: 27,
        width: 27,
    },
    modalAvatar2: {
        height: 70,
        width: 70,
        marginBottom: 28,
        borderColor: '#586589',
        borderWidth: 4,
    },
});
