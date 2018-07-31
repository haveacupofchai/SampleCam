/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import Camera from 'react-native-camera'

type Props = {};
export default class App extends Component<Props> {

  state = {users: []}

  componentDidMount() {
    fetch('http://sampleserver.azurewebsites.net/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
      .catch((error) => {
        console.error(error);
      });
  }

  takePicture() {
    this.camera.capture()
       .then((data) => console.log(data))
       .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
      <Camera
   ref={(cam) => {
       this.camera = cam;
    }}
    style={styles.preview}
    aspect={Camera.constants.Aspect.fill}>
       <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
          [CAPTURE]
       </Text>
       </Camera>
        <Text style={styles.instructions}>This app is also receiving!</Text>
        <FlatList
          data={this.state.users}
          renderItem={({item}) => <Text>{item.id}, {item.username}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
 },
 capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
 },
});
