import React, { Component } from 'react';
import { Image, Animated, View } from 'react-native';
import { FileSystem } from 'expo';
import SHA1 from 'crypto-js/sha1';

class CachedImage extends Component {
  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  async componentWillMount() {
    const { preview, uri } = this.props;
    this.setState({ opacity: new Animated.Value(0) });

    const entry = await getCacheEntry(uri);
    if (!entry.exists) {
      if (preview) {
        this.setState({ uri: preview, preview: true });
      }
      if (uri.startsWith('file://')) {
        await FileSystem.copyAsync({ from: uri, to: entry.path });
      } else {
        await FileSystem.downloadAsync(uri, entry.path);
      }
    }

    if (this._mounted) {
      this.setState({ uri: entry.path, preview: false });
    }
  }

  onLoadEnd = () => {
    if (!this.state.preview) {
      Animated
        .timing(this.state.opacity, {
          duration: 1000,
          toValue: 1,
        })
        .start();
    }
  }

  render() {
    const { containerStyle, imageStyle, contain } = this.props;
    const { uri, preview } = this.state;
    const resizeMode = contain ? 'contain' : 'cover';

    return (
      <View style={containerStyle}>
        {preview &&
          <Image
            source={uri}
            style={imageStyle}
          />
        }
        {!preview &&
          <Animated.Image
            resizeMode={resizeMode}
            source={{ uri }}
            style={[
              imageStyle,
              { opacity: this.state.opacity },
            ]}
            onLoad={this.onLoadEnd}
          />
        }
      </View>
    );
  }
}

const getCacheEntry = async (uri) => {
  const ext = uri.substring(uri.lastIndexOf('.'), uri.indexOf('?') === -1 ? undefined : uri.indexOf('?'));
  const path = FileSystem.cacheDirectory + SHA1(uri) + ext;
  const info = await FileSystem.getInfoAsync(path);
  const {exists} = info;
  return { exists, path };
}

export { CachedImage };
