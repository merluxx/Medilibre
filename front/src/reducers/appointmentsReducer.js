import {
  SET_APPOINTMENTS_LIST,
  SET_OPEN_APPOINTMENT,
  SET_OPEN_HISTORIC,
  SET_APPOINTMENTS_PAGE_FIELDS,
} from 'src/actions/appointments';

const initialState = {
  appointmentsList: [],
  openAppointment: false,
  openHistoric: false,
  tableState: {
    columns: [
      { title: 'Date', field: 'date' },
      { title: 'Durée', field: 'duration' },
      { title: 'Professionnel', field: 'professional', type: 'numeric' },
      { title: 'Professionnel', field: 'professional', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      {
        name: 'Mehmet',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 63,
      },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  },
  deleteDialogShow: false,
  selectedAppointment: {},
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_APPOINTMENTS_PAGE_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    case SET_OPEN_HISTORIC:
      return {
        ...state,
        openHistoric: action.value,
      };
    case SET_OPEN_APPOINTMENT:
      return {
        ...state,
        openAppointment: action.value,
      };
    case SET_APPOINTMENTS_LIST:
      return {
        ...state,
        appointmentsList: action.list,
      };
    default:
      return state;
  }
};

export default mainReducer;
