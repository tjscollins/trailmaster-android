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

export const toggleVisibility = (id) => {
  return {type: 'TOGGLE_VISIBILITY', id};
};

export const clearMap = () => {
  return {type: 'CLEAR_MAP'};
};

// geoJSON actions
export const replaceGeoJSON = (features) => {
  return {type: 'REPLACE_GEO_JSON', features};
};

//trails actions
export const displayTrails = (trails) => {
  return {type: 'DISPLAY_TRAILS', trails};
};

export const clearTrails = () => {
  return {type: 'CLEAR_TRAILS'};
};

export const saveTrail = (trail) => {
  return {type: 'SAVE_TRAIL', trail};
};

export const showTrail = (id) => {
  return {type: 'SHOW_TRAIL', id};
};
