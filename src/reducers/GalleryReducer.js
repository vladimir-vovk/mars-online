import { GALLERY_UPDATE, GALLERY_UPDATE_PHOTOS, GALLERY_LOAD } from '../actions/types';
import { saveMissionGallery } from '../utils';

const INITIAL_STATE = {
  refreshing: false,
  refreshingFooter: false,
  preview: false,
  previewUri: '',

  curiosity: {
    /* 2017: {
     *   title: 'Sol 2017 / 2012-07-03',
     *   photos: [
     *     {
     *       id: 1234,
     *       camera: 'MAST',
     *       imgSrc: '',
     *       earthDate: '',
     *     },
     *   ...
     *   ],
     * },
     */
  },
  opportunity: {
  },
  spirit: {
  },
};

function galleryLoad(state, { missionKey, sol, value }) {
  const mission = state[missionKey];
  mission[sol] = value;
  return { ...state, [missionKey]: mission };
}

function galleryUpdatePhotos(state, { missionKey, sol, photos }) {
  let title = `Sol ${sol}`;
  if (photos.length && photos[0].earthDate) {
    let year, month, day;
    [year, month, day] = photos[0].earthDate.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    title += ` / ${day} ${months[Number(month) - 1]} ${year}`;
  }
  const mission = state[missionKey];
  mission[sol] = { title, photos };
  saveMissionGallery(missionKey, sol, mission[sol]);
  return { ...state, [missionKey]: mission };
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GALLERY_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case GALLERY_LOAD:
      return galleryLoad(state, action.payload);

    case GALLERY_UPDATE_PHOTOS:
      return galleryUpdatePhotos(state, action.payload);

    default:
      return state;
  }
};
