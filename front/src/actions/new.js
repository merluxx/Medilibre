export const VALID_NEW_DOCTOR_EMAIL = 'VALID_NEW_DOCTOR_EMAIL';
export const SET_NEW_FIELDS = 'SET_NEW_FIELDS';

export const validNewDoctorEmail = (id) => ({
  type: VALID_NEW_DOCTOR_EMAIL,
  id,
});

export const setNewFields = (field, value) => ({
  type: SET_NEW_FIELDS,
  field,
  value,
});
