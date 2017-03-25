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

// userSession actions
export const updatePOS = (position) => {
  return {type: 'UPDATE_POS', position};
};

// geoJSON actions
export const replaceGeoJSON = (features) => {
  return {type: 'REPLACE_GEO_JSON', features};
};
