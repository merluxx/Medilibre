export const DELETE_USER = 'DELETE_USER';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_TABLE_STATE = 'SET_TABLE_STATE';
export const SET_PATIENTS_PAGE_FIELDS = 'SET_PATIENT_PAGE_FIELDS';

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId,
});

export const addUser = (newUser) => ({
  type: ADD_USER,
  newUser,
});

export const updateUser = (lastUser) => ({
  type: UPDATE_USER,
  lastUser,
});

export const setTableState = (newTableState) => ({
  type: SET_TABLE_STATE,
  newTableState,
});

export const setPatientsPageFields = (field, value) => ({
  type: SET_PATIENTS_PAGE_FIELDS,
  field,
  value,
});
