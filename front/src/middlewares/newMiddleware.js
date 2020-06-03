import { VALID_NEW_DOCTOR_EMAIL, setNewFields } from 'src/actions/new';
import {
  addFlashMessage,
} from 'src/actions/app';
import Axios from 'axios';
import SERVEUR_URL from 'src/config';


const newMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case VALID_NEW_DOCTOR_EMAIL: {
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/doctor/pendingDoctor`,
        data: {
          newDoctorId: action.id,
        },
      })
        .then(() => {
          store.dispatch(setNewFields('validAccount', true));
          store.dispatch(addFlashMessage('Votre compte est desormé actif vous béneficiez des services MediLibre', 'succes'));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur est survenue, veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default newMiddleware;
