import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Modal, Dimensions } from 'react-native';
import { CachedImage } from './common';
import images from 'app/assets/images';

class Preview extends Component {
  render() {
    const { visible, uri, onClose } = this.props;

    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View
          style={styles.container}
        >
          <ScrollView
            style={styles.scroll}
            contentOffset={contentOffset}
            horizontal
            minimumZoomScale={1}
            maximumZoomScale={5.0}
          >
            <CachedImage
              imageStyle={styles.image}
              uri={uri}
              preview={images.nasa}
              contain
            />
          </ScrollView>
          <TouchableOpacity
            style={styles.touch}
            activeOpacity={0.85}
            onPress={onClose}
          >
            <Text style={styles.text}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const { width, height } = Dimensions.get('window');
const scrollHeight = height * 0.8;
const scrollWidth = width - 24;
const contentOffset = { x: scrollHeight / 4, y: 0 };

const styles = {
  text: {
    color: 'white',
    fontSize: 18,
  },
  scroll: {
    width: scrollWidth,
    height: scrollHeight,
    marginTop: height * 0.05,
  },
  image: {
    width: scrollHeight,
    height: scrollHeight,
  },
  touch: {
    width: width,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

export default Preview;
