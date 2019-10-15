import React from 'react';
import { Content, Card, CardItem, Text, Button, Icon, Left, Body } from 'native-base';
import { Image } from 'react-native';

import NavigationService from '../NavigationService';
import _ from 'lodash';
import type {ContentAvailable} from 'react-native/Libraries/PushNotificationIOS/PushNotificationIOS';


const HaberListItem = ({ item }) => (

    <Content>
        <Text>{item.title}</Text>
    </Content>

);

export default HaberListItem;
