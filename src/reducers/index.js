import { combineReducers } from 'redux';
import MissionsReducer from './MissionsReducer';
import GalleryReducer from './GalleryReducer';

export default combineReducers({
  missions: MissionsReducer,
  gallery: GalleryReducer,
});
