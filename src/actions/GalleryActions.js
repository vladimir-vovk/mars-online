import { GALLERY_LOAD, GALLERY_UPDATE, GALLERY_UPDATE_PHOTOS, MISSIONS_UPDATE } from './types';
import urls from '../config/urls';
import { missionInfoFromManifest, saveMissionInfo } from '../utils';

export const galleryUpdate = ({ prop, value }) => ({
  type: GALLERY_UPDATE,
  payload: { prop, value },
});

export const galleryLoad = ({ missionKey, sol, value }) => ({
  type: GALLERY_LOAD,
  payload: { missionKey, sol, value },
});

function fetchGallery(missionKey, sol, dispatch) {
  const url = urls.photos
    .replace('${missionKey}', missionKey)
    .replace('${sol}', sol)
    .replace('${apiKey}', urls.apiKey);
  return fetch(url)
    .then(response => response.json())
    .then((responseData) => {
      const photos= responseData.photos.map(data => ({
        id: data.id,
        camera: data.camera.name,
        imgSrc: data.img_src,
        earthDate: data.earth_date,
      }));

      dispatch({ type: GALLERY_UPDATE_PHOTOS, payload: { missionKey, sol, photos } });
    })
    .catch(error => console.warn('fetchGallery ->', error));
}

export const galleryFetchLast = ({ missionKey, missionSols }) => {
  return (dispatch) => {
    const url = urls.manifests.replace('${missionKey}', missionKey).replace('${apiKey}', urls.apiKey);
    fetch(url)
      .then(response => response.json())
      .then((responseData) => {
        const value = missionInfoFromManifest(responseData.photo_manifest);

        dispatch({ type: MISSIONS_UPDATE, payload: { prop: [missionKey], value } });
        saveMissionInfo(missionKey, value);

        /* Fetch sol only if it doesn't fetched already */
        if (!(value.maxSol in missionSols)) {
          Promise.all([ fetchGallery(missionKey, value.maxSol, dispatch) ])
            .then(() => {
              dispatch({ type: GALLERY_UPDATE, payload: { prop: 'refreshing', value: false } });
            }, (error) => {
              console.warn(`galleryFetchLast -> fetchGallery(${missionKey}, ${value.maxSol}) -> ${error}`);
            });
        }
      })
      .catch(error => console.warn('galleryFetchLast ->', error));
  };
};

export const galleryFetchPrevious = ({ missionKey, missionSols }) => {
  return (dispatch) => {
    /* To get previous sol we need to have something already. Refresh instead. */
    if (!missionSols.length) {
      return;
    }

    const sols = missionSols.map(item => Number(item)).sort();
    const minSol = sols[0] - 1;

    if (minSol > 0) {
      Promise.all([ fetchGallery(missionKey, minSol, dispatch) ])
        .then(() => {
          dispatch({ type: GALLERY_UPDATE, payload: { prop: 'refreshingFooter', value: false } });
        }, (error) => {
          console.warn(`galleryFetchPrevious -> fetchGallery(${missionKey}, ${minSol}) -> ${error}`);
        });
    }
  };
};
