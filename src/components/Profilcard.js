import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import NavigationService from '../NavigationService';
import { Container, Header, Content, Card, CardItem, Thumbnail,Icon, Button, Left, Body } from 'native-base';
import {Divider, Tile} from '@shoutem/ui';


export default class Profilcard extends Component {

    render() {
        return (
            <Content>
                <Card style={{flex: 1}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'http://i2.hurimg.com/i/hurriyet/75/1110x740/5b0e5ddabf49c21958da2d8a.jpg'}} />
                            <Body>
                            <Text>NativeBase</Text>
                            <Text note>April 15, 2016</Text>
                            </Body>
                        </Left>
                        <Divider styleName="line" />

                    </CardItem>
                    <CardItem>
                        <Body>
                        <Image source={{uri: 'http://i2.hurimg.com/i/hurriyet/75/1110x740/5b0e5ddabf49c21958da2d8a.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
                        <Text>
                            //Your text here
                        </Text>
                        </Body>

                        <Divider styleName="line" />

                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent textStyle={{color: '#87838B'}}>
                                <Icon name="logo-github" />
                                <Text>1,926 stars</Text>
                            </Button>
                        </Left>
                        <Divider styleName="line" />

                    </CardItem>
                </Card>
                <Card style={{flex: 1}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'http://i2.hurimg.com/i/hurriyet/75/1110x740/5b0e5ddabf49c21958da2d8a.jpg'}} />
                            <Body>
                            <Text>NativeBase</Text>
                            <Text note>April 15, 2016</Text>
                            </Body>
                        </Left>
                        <Divider styleName="line" />

                    </CardItem>
                    <CardItem>
                        <Body>
                        <Image source={{uri: 'http://i2.hurimg.com/i/hurriyet/75/1110x740/5b0e5ddabf49c21958da2d8a.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
                        <Text>
                            //Your text here
                        </Text>
                        </Body>

                        <Divider styleName="line" />

                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent textStyle={{color: '#87838B'}}>
                                <Icon name="logo-github" />
                                <Text>1,926 stars</Text>
                            </Button>
                        </Left>
                        <Divider styleName="line" />

                    </CardItem>
                </Card>
                <Card style={{flex: 1}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'http://i2.hurimg.com/i/hurriyet/75/1110x740/5b0e5ddabf49c21958da2d8a.jpg'}} />
                            <Body>
                            <Text>NativeBase</Text>
                            <Text note>April 15, 2016</Text>
                            </Body>
                        </Left>
                        <Divider styleName="line" />

                    </CardItem>
                    <CardItem>
                        <Body>
                        <Image source={{uri: 'http://i2.hurimg.com/i/hurriyet/75/1110x740/5b0e5ddabf49c21958da2d8a.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
                        <Text>
                            //Your text here
                        </Text>
                        </Body>

                        <Divider styleName="line" />

                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent textStyle={{color: '#87838B'}}>
                                <Icon name="logo-github" />
                                <Text>1,926 stars</Text>
                            </Button>
                        </Left>
                        <Divider styleName="line" />

                    </CardItem>
                </Card>
            </Content>
        )
    }
}

const  styles = StyleSheet.create({
    useredit:{
        resizeMode: 'stretch',
        height:25,
        width: 25,
    },
    usercontainer:{
        flex: 1,

        paddingVertical: -30,
        paddingHorizontal:10,

    },
});
