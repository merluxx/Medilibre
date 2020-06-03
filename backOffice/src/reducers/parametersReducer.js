import { SET_PARAMETERS_FIELDS } from 'src/actions/parameters';

const initialState = {
  duration: '30',
  frequency: '30',
  delay: '1440',
  start: '2020-01-01 07:00',
  end: '2020-01-01 21:00',
  success: false,
  password: '',
  passwordError: false,
  confirmPassword: '',
  confirmPasswordError: false,
  groupSessions: false,
  groupSize: 1,
  period: 7,
  sessionTypesDialogShow: false,
  sessionTypes: [],
  sessionTypesState: {
    columns: [
      { title: 'Intitulé', field: 'name' },
      { title: 'Durée', field: 'duration' },
      { title: 'Couleur', field: 'color' },
    ],
    data: [],
  },
  deleteDialogShow: false,
  editDialogShow: false,
  addDialogShow: false,
  currentSessionType: {},
  modifiedCurrentColor: '#f0f',
  showColorPicker: false,
  newTypeName: '',
  newTypeDuration: 30,
  newTypeFrequency: 30,
  newTypeColor: '#242A66',
  newTypeGroupSession: false,
  newTypeGroupSize: 1,
  customMailTextDialog: false,
  customMailText: '',
};

const parametersrReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PARAMETERS_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default parametersrReducer;
