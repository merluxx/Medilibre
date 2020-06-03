export const SET_MANAGE_DOCTOR_FIELDS = 'SET_MANAGE_DOCTOR_FIELDS';
export const LOAD_DOCTORS_FULL_LIST = 'LOAD_DOCTOR_FULL_LIST';
export const DELETE_DOCTOR = 'DELETE_DOCTOR';

export const setManageDoctorFields = (field, value) => ({
  type: SET_MANAGE_DOCTOR_FIELDS,
  field,
  value,
});

export const loadDoctorFullList = () => ({
  type: LOAD_DOCTORS_FULL_LIST,
});

export const deleteDoctor = () => ({
  type: DELETE_DOCTOR,
});
