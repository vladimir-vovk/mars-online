import { AsyncStorage } from 'react-native';
import { MISSIONS_UPDATE } from './types';
import urls from '../config/urls';

export const missionsUpdate = ({ prop, value }) => ({
  type: MISSIONS_UPDATE,
  payload: { prop, value },
});

export const missionsFetch = (missions) => {
  return (dispatch) => {
    dispatch({ type: MISSIONS_UPDATE, payload: { prop: 'refreshing', value: true } });

    Promise.all(
      missions.map((mission) => {
        const url = urls.manifests.replace('${missionKey}', mission).replace('${apiKey}', urls.apiKey);
        return fetch(url)
          .then(response => response.json())
          .then((responseData) => {
            const data = responseData.photo_manifest;
            const value = {
              name: data.name,
              landingDate: data.landing_date,
              launchDate: data.launch_date,
              status: data.status,
              maxSol: data.max_sol,
              maxDate: data.max_date,
              totalPhotos: data.total_photos,
            };

            dispatch({ type: MISSIONS_UPDATE, payload: { prop: [mission], value } });
            AsyncStorage.setItem(`missions_${mission}`, JSON.stringify(value));
          })
          .catch(error => console.warn('missionsFetch ->', error));
      })

    ).then(() => {
      dispatch({ type: MISSIONS_UPDATE, payload: { prop: 'refreshing', value: false } });

    }, (err) => {
      console.warn('missionsFetch ->', err);
      dispatch({ type: MISSIONS_UPDATE, payload: { prop: 'refreshing', value: false } });
    });
  };
};
