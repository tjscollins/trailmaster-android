export const UIReducer = (state = {}, action) => {
  switch(action.type) {
    case 'TOGGLE_HEADER':
      return {
        ...state,
        minimizedHeader: !state.minimizedHeader,
      };
    default:
      return state;
  }
};
