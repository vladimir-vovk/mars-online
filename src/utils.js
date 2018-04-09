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

function missionInfoFromManifest(data) {
  return {
    name: data.name,
    landingDate: data.landing_date,
    launchDate: data.launch_date,
    status: data.status,
    maxSol: data.max_sol,
    maxDate: data.max_date,
    totalPhotos: data.total_photos,
  };
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

        if (key.startsWith('gallery_')) {
          let missionKey, sol;
          [missionKey, sol] = key.replace('gallery_', '').split('-');
          this.props.galleryLoad({ missionKey, sol, value: JSON.parse(value) });
        }
      })
    })
  })
}

function saveMissionInfo(missionKey, data) {
  AsyncStorage.setItem(`missions_${missionKey}`, JSON.stringify(data));
}

function saveMissionGallery(missionKey, sol, data) {
  AsyncStorage.setItem(`gallery_${missionKey}-${sol}`, JSON.stringify(data));
}

export { saveMissionInfo, saveMissionGallery, loadAssetsAsync, loadState, missionInfoFromManifest };
