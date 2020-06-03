import { connect } from 'react-redux';

import {
  getUserAppointments,
  setOpenHistoric,
  setAppointmentsPageFields,
  deleteAppointment,
} from 'src/actions/appointments';

import Appointments from 'src/components/Appointments';

const mapStateToProps = (state) => ({
  appointmentsList: state.appointments.appointmentsList,
  tableState: state.appointments.tableState,
  deleteDialogShow: state.appointments.deleteDialogShow,
  selectedAppointment: state.appointments.selectedAppointment,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  getUserAppointments: () => {
    dispatch(getUserAppointments());
  },
  setOpenHistoric: (value) => {
    dispatch(setOpenHistoric(value));
  },
  setAppointmentsPageFields: (field, value) => {
    dispatch(setAppointmentsPageFields(field, value));
  },
  deleteAppointment: (id) => {
    dispatch(deleteAppointment(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appointments);
