import { SET_TABLE_STATE, SET_PATIENTS_PAGE_FIELDS } from 'src/actions/patients';

const initialState = {
  tableState: {
    columns: [
      { title: 'Nom', field: 'lastname' },
      { title: 'Prénom', field: 'firstname' },
      { title: 'N° de téléphone', field: 'phone' },
      { title: 'email', field: 'email', editable: 'never' },
    ],
    data: [],
  },
  userList: [],
};

const newUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PATIENTS_PAGE_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    case SET_TABLE_STATE:
      return {
        ...state,
        tableState: action.newTableState,
      };
    default:
      return state;
  }
};

export default newUserReducer;
