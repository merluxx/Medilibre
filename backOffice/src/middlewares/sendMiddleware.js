import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import { SUBMIT_NEWSLETTER, setSendFields } from 'src/actions/send';
import { addFlashMessage } from 'src/actions/app';


// eslint-disable-next-line no-unused-vars
const sendMiddleware = (store) => (next) => (action) => {
  const { doctorToken } = sessionStorage;
  switch (action.type) {
    case SUBMIT_NEWSLETTER: {
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/doctor/newsletter`,
        data: {
          subject: store.getState().send.subject,
          content: store.getState().send.content,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
      })
        .then(() => {
          store.dispatch(setSendFields('subject', ''));
          store.dispatch(setSendFields('content', ''));
          store.dispatch(addFlashMessage('Votre mot de passe vient d\'être réinitialisé', 'success'));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default sendMiddleware;
