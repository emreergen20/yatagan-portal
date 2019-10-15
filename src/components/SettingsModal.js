import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SettingsModal extends Component {
  render() {
    return (
      <View style={styles.container} opacity={0.3} transparent={true}>
				<Text style={styles.text}>Settings Modal</Text>
			</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	text: {
		color: '#f1f1f1',
		fontSize: 32
	}
});
