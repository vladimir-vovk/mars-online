import { MISSIONS_UPDATE } from './types';
import urls from '../config/urls';
import { missionInfoFromManifest, saveMissionInfo } from '../utils';

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
            const value = missionInfoFromManifest(responseData.photo_manifest);

            dispatch({ type: MISSIONS_UPDATE, payload: { prop: [mission], value } });
            saveMissionInfo(mission, value);
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
