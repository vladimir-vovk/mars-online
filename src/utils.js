import { Image, AsyncStorage } from 'react-native';
import { Asset, Font } from 'expo';

function cacheImages(images) {
  Object.keys(images).map((key) => {
    const image = images[key];
    if (typeof(image) === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  if (Object.keys(fonts).length) {
    return Font.loadAsync(fonts);
  } else {
    return null;
  }
}

function loadState() {
  return AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        let key = store[i][0]
        let value = store[i][1]

        if (key.startsWith('missions_')) {
          this.props.missionsUpdate({ prop: key.replace('missions_', ''), value: JSON.parse(value) })
        }
      })
    })
  })
}

async function loadAssetsAsync(images, fonts) {
  const imageAssets = cacheImages(images);
  const fontAssets = cacheFonts(fonts);

  let assets = [];
  if (imageAssets) {
    assets = [...imageAssets];
  }
  if (fontAssets) {
    assets.push(fontAssets);
  }

  await Promise.all(assets);
}

export { loadAssetsAsync, loadState };
