import * as actionTypes from "../actions/actionTypes";

const initialState = {
  images: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_IMAGES:
      return Object.assign(...initialState, {
        images: action.images
      });
      case actionTypes.DELETE_IMAGE:
      return Object.assign(...initialState, {
        images: action.images
      });
    default:
      return state;
  }
};

export default reducer;
