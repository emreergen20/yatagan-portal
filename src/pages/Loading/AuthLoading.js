import React, { Component } from 'react';
import {  Text, View } from 'react-native';
import {inject} from 'mobx-react';
import { Spinner } from '@shoutem/ui';

@inject('AuthStore')
export default class AuthLoading extends Component {
   async componentDidMount() {
       await this.props.AuthStore.setupAuth();
   }

    render() {
        return (
            <View>
                <Spinner size={"small"} color={"4365c1"}/>
            </View>
        )
    }
}

