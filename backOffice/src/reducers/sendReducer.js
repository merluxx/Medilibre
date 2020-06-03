import { SET_SEND_FIELDS } from 'src/actions/send';

const initialState = {
  subject: '',
  content: '',
};

const sendReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SEND_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default sendReducer;
