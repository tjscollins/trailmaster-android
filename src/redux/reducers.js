import {AsyncStorage} from 'react-native';

export const UIReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_HEADER':
      return {
        ...state,
        minimizedHeader: !state.minimizedHeader
      };
    case 'SWITCH_TO_MAP_VIEW':
      return {
        ...state,
        currentView: 'map'
      };
    case 'SWITCH_TO_SEARCH_VIEW':
      return {
        ...state,
        currentView: 'search'
      };
    case 'SWITCH_TO_HOME_VIEW':
      return {
        ...state,
        currentView: 'home'
      };
    default:
      return state;
  }
};

export const userSessionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      const {xAuth, userId, email} = action;
      const trailmasterLogin = {
        xAuth,
        _id: userId,
        email
      };
      AsyncStorage.setItem('trailmaster-login', JSON.stringify(trailmasterLogin));
      return {
        ...state,
        ...trailmasterLogin
      };
    case 'LOGOUT':
      AsyncStorage.removeItem('trailmaster-login');
      return {
        ...state,
        xAuth: null,
        _id: null,
        email: null
      };
    case 'UPDATE_POS':
      return {
        ...state,
        coords: {
          latitude: action.position.coords.latitude,
          longitude: action.position.coords.longitude
        }
      };
    case 'TOGGLE_VISIBILITY':
      return state
        .visibleFeatures
        .indexOf(action.id) > -1
        ? {
          ...state,
          visibleFeatures: state
            .visibleFeatures
            .filter((id) => {
              return id !== action.id;
            })
        }
        : {
          ...state,
          visibleFeatures : [
            ...state.visibleFeatures,
            action.id
          ]
        };
    default:
      return state;
  }
};

export const geoJSONReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REPLACE_GEO_JSON':
      return {
        ...state,
        features: action.features
      };
    default:
      return state;
  }
};

export const trailsReducer = (state={}, action) => {
  switch (action.type) {
    case 'DISPLAY_TRAILS':
      const {trails} = action;
      return {
        ...state,
        myTrails: trails,
      };
    case 'CLEAR_TRAILS':
      return {
        ...state,
        myTrails: [],
      };
    case 'SAVE_TRAIL':
      const date = new Date();
      const newTrail = {
        list: action.list,
        name: action.name,
        desc: action.desc,
        date: `${month(date.getMonth())} ${date.getFullYear()}`,
      };
      return {
        ...state,
        myTrails: [
          ...state.myTrails,
          newTrail,
        ],
      };
    default:
      return state;
  }
};

const month = (mo) => {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'][mo];
};
