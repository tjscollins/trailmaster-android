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
    default:
      return state;
  }
};

export const userSessionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_POS':
      return {
        ...state,
        coords: {
          latitude: action.position.coords.latitude,
          longitude: action.position.coords.longitude
        }
      };
    default:
      return state;
  }
};

export const geoJSONReducer = (state = {}, action) => {
  switch(action.type) {
    case 'REPLACE_GEO_JSON':
      return {
        ...state,
        features: action.features,
      };
    default:
      return state;
  }
};
