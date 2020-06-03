import { connect } from 'react-redux';

import { setManageDoctorFields, loadDoctorFullList, deleteDoctor } from 'src/actions/manageDoctor';

import ManageDoctor from 'src/components/ManageDoctor';

const mapStateToProps = (state) => ({
  doctors: state.manageDoctor.doctors,
  loading: state.manageDoctor.loading,
  tableState: state.manageDoctor.tableState,
  dialogShow: state.manageDoctor.dialogShow,
  selectedDoctor: state.manageDoctor.selectedDoctor,
  deleteShow: state.manageDoctor.deleteShow,
  confirm: state.manageDoctor.confirm,
  confirmError: state.manageDoctor.confirmError,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setManageDoctorFields: (field, value) => {
    dispatch(setManageDoctorFields(field, value));
  },
  loadDoctorFullList: () => {
    dispatch(loadDoctorFullList());
  },
  deleteDoctor: () => {
    dispatch(deleteDoctor());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageDoctor);
