export const SET_PARAMETERS_FIELDS = 'SET_PARAMETERS_FIELDS';
export const SUBMIT_PARAMETERS = 'SUBMIT_PARAMETERS';
export const SUBMIT_NEW_PASSWORD = 'SUBMIT_NEW_PASSWORD';
export const MODIFY_SESSION_TYPE = 'MODIFY_SESSION_TYPE';
export const DELETE_SESSION_TYPE = 'DELETE_SESSION_TYPE';
export const ADD_SESSION_TYPE = 'ADD_SESSION_TYPE';
export const CHANGE_CUSTOM_MAIL_TEXT = 'CHANGE_CUSTOM_MAIL_TEXT';

export const setParametersFields = (field, value) => ({
  type: SET_PARAMETERS_FIELDS,
  field,
  value,
});

export const submitParameters = () => ({
  type: SUBMIT_PARAMETERS,
});

export const submitNewPassword = () => ({
  type: SUBMIT_NEW_PASSWORD,
});

export const modifySessionType = () => ({
  type: MODIFY_SESSION_TYPE,
});

export const deleteSessionType = () => ({
  type: DELETE_SESSION_TYPE,
});

export const addSessionType = () => ({
  type: ADD_SESSION_TYPE,
});

export const changeCustomMailText = () => ({
  type: CHANGE_CUSTOM_MAIL_TEXT,
});
