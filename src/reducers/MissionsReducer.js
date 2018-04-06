import { MISSIONS_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  order: ['curiosity', 'opportunity', 'spirit'],
  curiosity: {
    name: 'Curiosity',
    landingDate: '2012-08-06',
    launchDate: '2011-11-26',
    status: 'active',
    maxSol: 2011,
    maxDate: '2018-04-03',
    totalPhotos: 334100,
  },
  opportunity: {
    name: 'Opportunity',
    landingDate: '2004-01-25',
    launchDate: '2003-07-07',
    status: 'active',
    maxSol: 5044,
    maxDate: '2018-04-03',
    totalPhotos: 196119,
  },
  spirit: {
    name: 'Spirit',
    landingDate: '2004-01-04',
    launchDate: '2003-06-10',
    status: 'complete',
    maxSol: 2208,
    maxDate: '2010-03-21',
    totalPhotos: 124550,
  },
  refreshing: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MISSIONS_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
