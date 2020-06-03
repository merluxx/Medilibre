import { SET_SUSCRIBE_DOCTOR_FIELDS } from 'src/actions/suscribeDoctor';

const initialState = {
  firstname: '',
  firstnameError: false,
  lastname: '',
  lastnameError: false,
  email: '',
  emailError: false,
  job: '',
  jobError: false,
  adress: '',
  adressError: false,
  zip: '',
  zipError: false,
  city: '',
  cityError: false,
  password: '',
  passwordError: false,
  confirmPassword: '',
  confirmPasswordError: false,
};

const suscribeDoctorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SUSCRIBE_DOCTOR_FIELDS:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default suscribeDoctorReducer;
