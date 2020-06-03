import { SET_NEW_FIELDS } from 'src/actions/new';

const initialState = {
  validAccount: false,
};

const newReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_NEW_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default newReducer;
