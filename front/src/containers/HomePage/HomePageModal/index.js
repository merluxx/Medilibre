/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';

import { logoutUser } from 'src/actions/app';

import {
  selectAppointment,
  selectCurrentAppointment,
  setHomePageModalShow,
  setSelectedDay,
  saveFuturAppointments,
  setAppointmentType,
  setColor,
  setCustomDuration,
} from 'src/actions/homePage';
import { setOpenRenew } from 'src/actions/renew';

import HomePageModal from 'src/components/HomePage/HomePageModal';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  currentAppointment: state.homePage.currentAppointment,
  isLogged: state.main.isLogged,
  userDatas: state.user.userDatas,
  selectedDay: state.homePage.selectedDay,
  appointmentDuration: state.main.parameters.appointmentDuration,
  appointmentFrequency: state.main.parameters.appointmentFrequency,
  appointmentDelay: state.main.parameters.appointmentDelay,
  futurAppointments: state.homePage.futurAppointments,
  oppeningDays: state.main.parameters.oppeningDays,
  oppeningHours: state.main.parameters.oppeningHours,
  onlineAppointment: state.main.parameters.onlineAppointment,
  groupSessions: state.main.parameters.groupSessions,
  groupSize: state.main.parameters.groupSize,
  doctorId: state.main.parameters._id,
  appointmentPeriod: state.main.parameters.appointmentPeriod,
  appointmentType: state.homePage.appointmentType,
  parameters: state.main.parameters,
});

const mapDispatchToProps = (dispatch) => ({
  selectAppointment: () => {
    dispatch(selectAppointment());
  },
  selectCurrentAppointment: (startTime) => {
    dispatch(selectCurrentAppointment(startTime));
  },
  setHomePageModalShow: (value) => {
    dispatch(setHomePageModalShow(value));
  },
  logoutUser: () => {
    dispatch(logoutUser());
  },
  setSelectedDay: (value) => {
    dispatch(setSelectedDay(value));
  },
  saveFuturAppointments: (appointments) => {
    dispatch(saveFuturAppointments(appointments));
  },
  setOpenRenew: (value) => {
    dispatch(setOpenRenew(value));
  },
  setAppointmentType: (type) => {
    dispatch(setAppointmentType(type));
  },
  setColor: (color) => {
    dispatch(setColor(color));
  },
  setCustomDuration: (duration) => {
    dispatch(setCustomDuration(duration));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePageModal);
