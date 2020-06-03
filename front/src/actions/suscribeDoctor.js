export const SET_SUSCRIBE_DOCTOR_FIELDS = 'SET_SUSCRIBE_DOCTOR_FIELDS';
export const SUBMIT_DOCTOR_SUSCRIBE_FORM = 'SUBMIT_DOCTOR_SUSCRIBE_FORM';

export const setSuscribeDoctorFields = (field, value) => ({
  type: SET_SUSCRIBE_DOCTOR_FIELDS,
  field,
  value,
});

export const submitDoctorSuscribeForm = () => ({
  type: SUBMIT_DOCTOR_SUSCRIBE_FORM,
});
