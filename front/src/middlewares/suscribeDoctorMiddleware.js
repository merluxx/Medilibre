import { SUBMIT_DOCTOR_SUSCRIBE_FORM } from 'src/actions/suscribeDoctor';
import {
  addFlashMessage,
} from 'src/actions/app';
import Axios from 'axios';
import SERVEUR_URL from 'src/config';


const suscribeDoctorMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_DOCTOR_SUSCRIBE_FORM: {
      const { suscribeDoctor } = store.getState();
      const doctor = {
        firstname: suscribeDoctor.firstname,
        lastname: suscribeDoctor.lastname,
        job: suscribeDoctor.job,
        civility: '',
        appointmentFrequency: 30,
        appointmentDuration: 30,
        appointmentDelay: 1440,
        password: suscribeDoctor.password,
        email: suscribeDoctor.email,
        adress: suscribeDoctor.adress,
        zip: suscribeDoctor.zip,
        city: suscribeDoctor.city,
        publicEmail: '',
        phone: '',
        startPlanning: '08:00',
        endPlanning: '20:00',
        presentation: 'votre texte de presentation',
        slug: `${suscribeDoctor.firstname}-${suscribeDoctor.lastname}-${suscribeDoctor.city}`,
        superAdmin: false,
        onlineAppointment: false,
        groupSessions: false,
        groupSize: 1,
      };
      Axios({
        method: 'post',
        url: `${SERVEUR_URL}/doctor`,
        data: doctor,
      })
        .then(() => {
          store.dispatch(addFlashMessage('Votre demande est bien enregistrée, un mail de confirmation viens de vous être envoyé penssez à verifier vos spam', 'success'));
        })
        .catch((error) => {
          if (error.response.data.error === 'Adresse mail deja utilisée') {
            store.dispatch(addFlashMessage('Il semble que cette adresse mail soit déja utilisée', 'error'));
          }
          else {
            store.dispatch(addFlashMessage('une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
          }
        });
      break;
    }
    default:
      next(action);
  }
};

export default suscribeDoctorMiddleware;
