import Axios from 'axios';
import SERVEUR_URL from 'src/config';

import {
  SUBMIT_PARAMETERS,
  SUBMIT_NEW_PASSWORD,
  MODIFY_SESSION_TYPE,
  DELETE_SESSION_TYPE,
  ADD_SESSION_TYPE,
  CHANGE_CUSTOM_MAIL_TEXT,
  setParametersFields,
} from 'src/actions/parameters';
import { SWITCH_ONLINE_APPOINTMENTS, setDoctorDatas } from 'src/actions/doctor';

import { addFlashMessage } from 'src/actions/app';

// eslint-disable-next-line no-unused-vars
const parametersMiddleware = (store) => (next) => (action) => {
  const { doctorToken, doctorId } = sessionStorage;
  switch (action.type) {
    case CHANGE_CUSTOM_MAIL_TEXT: {
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          oppeningDays: store.getState().doctor.doctorDatas.oppeningDays,
          oppeningHours: store.getState().doctor.doctorDatas.oppeningHours,
          customMailText: store.getState().parameters.customMailText,
          sessionType: store.getState().doctor.doctorDatas.sessionType,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Votre modification à bien été prise en compte', 'success'));
          store.dispatch(setParametersFields('customMailText', ''));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    case ADD_SESSION_TYPE: {
      const {
        newTypeName,
        newTypeDuration,
        newTypeFrequency,
        newTypeColor,
        newTypeGroupSession,
        newTypeGroupSize,
      } = store.getState().parameters;
      const { sessionType } = store.getState().doctor.doctorDatas;
      const newSessionType = [
        ...sessionType,
        {
          name: newTypeName,
          duration: newTypeDuration,
          frequency: newTypeFrequency,
          color: newTypeColor,
          groupSession: newTypeGroupSession,
          groupSize: newTypeGroupSize,
        },
      ];
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          oppeningDays: store.getState().doctor.doctorDatas.oppeningDays,
          oppeningHours: store.getState().doctor.doctorDatas.oppeningHours,
          sessionType: newSessionType,
        },
      })
        .then((response) => {
          store.dispatch(addFlashMessage('Votre modification à bien été prise en compte', 'success'));
          store.dispatch(setParametersFields('sessionTypes', response.data.doctor.sessionType));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    case DELETE_SESSION_TYPE: {
      const { currentSessionType } = store.getState().parameters;
      const newTypes = store.getState().doctor.doctorDatas.sessionType.filter(
        (type) => type.name !== currentSessionType.name,
      );
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          oppeningDays: store.getState().doctor.doctorDatas.oppeningDays,
          oppeningHours: store.getState().doctor.doctorDatas.oppeningHours,
          sessionType: newTypes,
        },
      })
        .then((response) => {
          store.dispatch(addFlashMessage('Votre modification à bien été prise en compte', 'success'));
          store.dispatch(setParametersFields('sessionTypes', response.data.doctor.sessionType));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    case MODIFY_SESSION_TYPE: {
      const {
        newTypeName,
        newTypeDuration,
        newTypeFrequency,
        newTypeColor,
        newTypeGroupSession,
        newTypeGroupSize,
        currentSessionType,
      } = store.getState().parameters;
      const newCurrentType = [{
        name: newTypeName,
        duration: newTypeDuration,
        frequency: newTypeFrequency,
        color: newTypeColor,
        groupSession: newTypeGroupSession,
        groupSize: newTypeGroupSize,
      }];
      const otherTypes = store.getState().doctor.doctorDatas.sessionType.filter(
        (type) => type.name !== currentSessionType.name,
      );
      const newSessionTypes = [
        ...otherTypes,
        ...newCurrentType,
      ];
      const newDoctor = {
        oppeningDays: store.getState().doctor.doctorDatas.oppeningDays,
        oppeningHours: store.getState().doctor.doctorDatas.oppeningHours,
        sessionType: newSessionTypes,
      };
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: newDoctor,
      })
        .then((response) => {
          store.dispatch(addFlashMessage('Votre modification à bien été prise en compte', 'success'));
          store.dispatch(setParametersFields('sessionTypes', response.data.doctor.sessionType));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    case SWITCH_ONLINE_APPOINTMENTS: {
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          ...store.getState().doctor.doctorDatas,
          onlineAppointment: action.value,
        },
      })
        .then((response) => {
          const doctor = {
            ...store.getState().doctor.doctorDatas,
            ...response.data.doctor,
          };
          store.dispatch(setDoctorDatas(doctor));
        });
      break;
    }
    case SUBMIT_NEW_PASSWORD: {
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/changePassword/${doctorId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
        data: {
          password: store.getState().parameters.password,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Votre mot de passe à été modifié avec succés', 'success'));
          store.dispatch(setParametersFields('passwordError', false));
          store.dispatch(setParametersFields('password', ''));
          store.dispatch(setParametersFields('confirmPasswordError', false));
          store.dispatch(setParametersFields('confirmPassword', ''));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une erreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    case SUBMIT_PARAMETERS: {
      const { parameters } = store.getState();
      const datas = {
        oppeningHours: store.getState().doctor.doctorDatas.oppeningHours,
        oppeningDays: store.getState().doctor.doctorDatas.oppeningDays,
        appointmentDuration: parameters.duration,
        appointmentFrequency: parameters.frequency,
        appointmentDelay: parameters.delay,
        startPlanning: parameters.start,
        endPlanning: parameters.end,
        groupSessions: parameters.groupSessions,
        groupSize: parameters.groupSize,
        appointmentPeriod: parameters.period,
        sessionType: store.getState().doctor.doctorDatas.sessionType,
      };
      Axios({
        method: 'put',
        url: `${SERVEUR_URL}/doctor/${store.getState().doctor.doctorId}`,
        data: datas,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${doctorToken}`,
        },
      })
        .then(() => {
          store.dispatch(addFlashMessage('Les paramètres ont été enregistrés avec succés', 'success'));
          store.dispatch(setParametersFields('success', true));
        })
        .catch(() => {
          store.dispatch(addFlashMessage('Une rreur c\'est produite veuillez réessayer ulterieurement', 'error'));
        });
      break;
    }
    default:
      next(action);
  }
};

export default parametersMiddleware;
