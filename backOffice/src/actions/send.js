export const SET_SEND_FIELDS = 'SET_SEND_FIELDS';
export const SUBMIT_NEWSLETTER = 'SUBMIT_NEWSLETTER';

export const setSendFields = (field, value) => ({
  type: SET_SEND_FIELDS,
  field,
  value,
});

export const submitNewsletter = () => ({
  type: SUBMIT_NEWSLETTER,
});
