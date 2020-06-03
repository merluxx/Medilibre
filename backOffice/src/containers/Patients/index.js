import { connect } from 'react-redux';

import {
  addUser,
  deleteUser,
  updateUser,
  setTableState,
  setPatientsPageFields,
} from 'src/actions/patients';

import Patients from 'src/components/Patients';

const mapStateToProps = (state) => ({
  users: state.admin.users,
  tableState: state.patients.tableState,
  loading: state.main.loading,
  userList: state.patients.userList,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => {
    dispatch(addUser(user));
  },
  deleteUser: (userId) => {
    dispatch(deleteUser(userId));
  },
  updateUser: (user) => {
    dispatch(updateUser(user));
  },
  setTableState: (newTableState) => {
    dispatch(setTableState(newTableState));
  },
  setPatientsPageFields: (field, value) => {
    dispatch(setPatientsPageFields(field, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Patients);
