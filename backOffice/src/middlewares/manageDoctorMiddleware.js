import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import {
  LOAD_DOCTORS_FULL_LIST,
  DELETE_DOCTOR,
  setManageDoctorFields,
  loadDoctorFullList,
} from 'src/actions/manageDoctor';


import { addFlashMessage } from 'src/actions/app';


// eslint-disable-next-line no-unused-vars
const manageDoctorMiddleware = (store) => (next) => (action) => {
  const { doctorToken } = sessionStorage;
  switch (action.type) {
    case DELETE_DOCTOR: {
      Axios({
        method: 'delete',
        // eslint-disable-next-line no-underscore-dangle
        url: `${SERVEUR_URL}/doctor/${store.getState().manageDoctor.selectedDoctor._id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
      })
        .then(() => {
          store.dispatch(loadDoctorFullList());
          store.dispatch(setManageDoctorFields('deleteShow', false));
          store.dispatch(addFlashMessage('Compte praticien supprimé avec succés', 'success'));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    case LOAD_DOCTORS_FULL_LIST: {
      Axios({
        method: 'get',
        url: `${SERVEUR_URL}/doctor/fullList`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
      })
        .then((response) => {
          store.dispatch(setManageDoctorFields('doctors', response.data.doctors));
          store.dispatch(setManageDoctorFields('loading', false));
        });
      break;
    }
    default:
      next(action);
  }
};

export default manageDoctorMiddleware;
