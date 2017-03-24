export const UIReducer = (state = {}, action) => {
  switch(action.type) {
    case 'TOGGLE_HEADER':
      return {
        ...state,
        minimizedHeader: !state.minimizedHeader,
      };
    case 'SWITCH_TO_MAP_VIEW':
      return {
        ...state,
        currentView: 'map',
      };
    case 'SWITCH_TO_SEARCH_VIEW':
      return {
        ...state,
        currentView: 'search',
      };
    default:
      return state;
  }
};
