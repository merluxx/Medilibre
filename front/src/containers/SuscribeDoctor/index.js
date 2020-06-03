import { connect } from 'react-redux';
import { setSuscribeDoctorFields, submitDoctorSuscribeForm } from 'src/actions/suscribeDoctor';

import SuscribeDoctor from 'src/components/SuscribeDoctor';

const mapStateToProps = (state) => ({
  firstname: state.suscribeDoctor.firstname,
  lastname: state.suscribeDoctor.lastname,
  email: state.suscribeDoctor.email,
  job: state.suscribeDoctor.job,
  adress: state.suscribeDoctor.adress,
  zip: state.suscribeDoctor.zip,
  city: state.suscribeDoctor.city,
  firstnameError: state.suscribeDoctor.firstnameError,
  lastnameError: state.suscribeDoctor.lastnameError,
  emailError: state.suscribeDoctor.emailError,
  jobError: state.suscribeDoctor.jobError,
  adressError: state.suscribeDoctor.adressError,
  zipError: state.suscribeDoctor.zipError,
  cityError: state.suscribeDoctor.cityError,
  password: state.suscribeDoctor.password,
  passwordError: state.suscribeDoctor.passwordError,
  confirmPassword: state.suscribeDoctor.confirmPassword,
  confirmPasswordError: state.suscribeDoctor.confirmPasswordError,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setSuscribeDoctorFields: (field, value) => {
    dispatch(setSuscribeDoctorFields(field, value));
  },
  submitDoctorSuscribeForm: () => {
    dispatch(submitDoctorSuscribeForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuscribeDoctor);
