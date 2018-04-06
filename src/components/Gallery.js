import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Gallery extends Component {
  static navigationOptions = {
    title: 'Gallery',
  };

  render() {
    const { missionKey } = this.props.navigation.state.params;

    return (
      <View>
        <Text>
          Gallery screen {missionKey}
        </Text>
      </View>
    );
  }
}

export default Gallery;
