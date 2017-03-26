// UI actions
export const toggleHeader = () => {
  return {type: 'TOGGLE_HEADER'};
};

export const switchToMapView = () => {
  return {type: 'SWITCH_TO_MAP_VIEW'};
};

export const switchToSearchView = () => {
  return {type: 'SWITCH_TO_SEARCH_VIEW'};
};

export const switchToHomeView = () => {
  return {type: 'SWITCH_TO_HOME_VIEW'};
};

// userSession actions
export const login = (xAuth, userId, email) => {
  return {type: 'LOGIN', xAuth, userId, email};
};

export const logout = () => {
  return {type: 'LOGOUT'};
};

export const updatePOS = (position) => {
  return {type: 'UPDATE_POS', position};
};

// geoJSON actions
export const replaceGeoJSON = (features) => {
  return {type: 'REPLACE_GEO_JSON', features};
};

export const toggleVisibility = (id) => {
  return {type: 'TOGGLE_VISIBILITY', id};
};
