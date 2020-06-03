import { connect } from 'react-redux';

import {
  setParametersFields,
  modifySessionType,
  deleteSessionType,
  addSessionType,
} from 'src/actions/parameters';

import SessionTypes from 'src/components/Parameters/SessionTypes';

const mapStateToProps = (state) => ({
  doctorDatas: state.doctor.doctorDatas,
  sessionTypes: state.parameters.sessionTypes,
  sessionTypesState: state.parameters.sessionTypesState,
  deleteDialogShow: state.parameters.deleteDialogShow,
  editDialogShow: state.parameters.editDialogShow,
  currentSessionType: state.parameters.currentSessionType,
  modifiedCurrentColor: state.parameters.modifiedCurrentColor,
  showColorPicker: state.parameters.showColorPicker,
  newTypeName: state.parameters.newTypeName,
  newTypeDuration: state.parameters.newTypeDuration,
  newTypeFrequency: state.parameters.newTypeFrequency,
  newTypeColor: state.parameters.newTypeColor,
  newTypeGroupSession: state.parameters.newTypeGroupSession,
  newTypeGroupSize: state.parameters.newTypeGroupSize,
  addDialogShow: state.parameters.addDialogShow,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setParametersFields: (field, value) => {
    dispatch(setParametersFields(field, value));
  },
  modifySessionType: () => {
    dispatch(modifySessionType());
  },
  deleteSessionType: () => {
    dispatch(deleteSessionType());
  },
  addSessionType: () => {
    dispatch(addSessionType());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionTypes);
