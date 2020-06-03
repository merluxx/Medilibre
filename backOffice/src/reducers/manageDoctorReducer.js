import { SET_MANAGE_DOCTOR_FIELDS } from 'src/actions/manageDoctor';

const initialState = {
  doctors: [],
  loading: true,
  tableState: {
    columns: [
      { title: 'Nom', field: 'lastname' },
      { title: 'Prénom', field: 'firstname' },
      { title: 'Métier', field: 'job' },
      { title: 'email', field: 'email', editable: 'never' },
    ],
    data: [],
  },
  dialogShow: false,
  deleteShow: false,
  selectedDoctor: {},
  confirm: '',
  confirmError: false,
};

const manageDoctorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MANAGE_DOCTOR_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default manageDoctorReducer;
