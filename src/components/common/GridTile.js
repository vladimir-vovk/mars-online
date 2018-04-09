import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { CachedImage } from './CachedImage';

class GridTile extends Component {
  render() {
    const { onPress, imageStyle, uri, preview } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
      >
        <CachedImage
          imageStyle={imageStyle}
          uri={uri}
          preview={preview}
        />
      </TouchableOpacity>
    );
  }
}

export { GridTile };
