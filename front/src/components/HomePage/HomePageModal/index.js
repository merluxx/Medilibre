import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { getNextDays, getDayAppointments } from 'src/utils/dateFunctions';

import SERVEUR_URL from 'src/config';
import 'react-calendar/dist/Calendar.css';
import './homePageModal.scss';

import NewUserForm from 'src/containers/HomePage/HomePageModal/NewUserForm';
import ConnectForm from 'src/containers/HomePage/HomePageModal/ConnectForm';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const HomePageModal = ({
  userDatas,
  currentAppointment,
  selectCurrentAppointment,
  isLogged,
  activeStep,
  logoutUser,
  selectedDay,
  setSelectedDay,
  appointmentType,
  setAppointmentType,
  appointmentDuration,
  appointmentDelay,
  futurAppointments,
  oppeningDays,
  oppeningHours,
  onlineAppointment,
  saveFuturAppointments,
  doctorId,
  appointmentPeriod,
  setOpenRenew,
  parameters,
  setColor,
  setCustomDuration,
}) => {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (parameters.sessionType !== []) {
      setAppointmentType(parameters.sessionType[0]);
    }
  }, []);

  useEffect(() => {
    const now = Date.parse(new Date());
    Axios({
      method: 'get',
      // eslint-disable-next-line no-underscore-dangle
      url: `${SERVEUR_URL}/appointment/${doctorId}/futur/${now}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      let duration;
      if (appointmentType && appointmentType.name !== undefined) {
        duration = appointmentType.duration;
        setColor(appointmentType.color);
      }
      else {
        duration = appointmentDuration;
        setColor('#242a65');
      }
      setCustomDuration(duration);
      saveFuturAppointments(response.data);
      // objectif recuperer une liste de jours
      const currentDate = Date.now();
      const days = getNextDays(
        currentDate,
        appointmentDelay,
        duration,
        appointmentPeriod,
        response.data,
        oppeningHours,
        oppeningDays,
      );
      setDayList(days);
      // fin de la premiere fonction
      // fonction suivante pour un jour selectionner recuperer une liste de rendez-vous
      if (days.length > 0) {
        setSelectedDay(days[0]);
        const currentDayAppointments = getDayAppointments(
          days[0],
          appointmentDelay,
          duration,
          response.data,
          oppeningHours,
        );
        setAppointments(currentDayAppointments);
        selectCurrentAppointment(currentDayAppointments[0]);
        const currentTime = `${(`0${currentDayAppointments[0].getHours()}`).substr(-2)}:${(`0${currentDayAppointments[0].getMinutes()}`).substr(-2)}`;
        setTime(currentTime);
      }
      setLoading(false);
    });
  }, [appointmentType]);

  useEffect(() => {
    if (appointments.length > 0) {
      const currentTime = `${(`0${appointments[0].getHours()}`).substr(-2)}:${(`0${appointments[0].getMinutes()}`).substr(-2)}`;
      setTime(currentTime);
    }
  }, [appointments]);

  const [newAccountToggle, setNewAccountToggle] = useState(false);
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
  const appointment = new Date(currentAppointment);

  return (
    <div className="homePageModal-content">
      {(activeStep === 0) && (
        <>
          <DialogTitle id="form-dialog-title">Selection du rendez-vous</DialogTitle>
          <DialogContent dividers>
            <div className="homePageModal-content-contentContainer">
              {parameters.sessionType.length > 0 && (
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="date">Objet</InputLabel>
                <Select
                  value={appointmentType}
                  onChange={(event) => {
                    setAppointmentType(event.target.value);
                  }}
                  label="Objet"
                  inputProps={{
                    name: 'date',
                    id: 'date',
                  }}
                >
                  {parameters.sessionType.map((type) => (
                    <MenuItem value={type} key={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              )}
              {dayList.length > 0
              && selectedDay
              && onlineAppointment
              && !loading
              && futurAppointments !== undefined
              && (
                <>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="date">Date</InputLabel>
                    <Select
                      value={selectedDay}
                      onChange={(event) => {
                        let duration;
                        if (appointmentType && appointmentType.name !== undefined) {
                          duration = appointmentType.duration;
                          setColor(appointmentType.color);
                        }
                        else {
                          duration = appointmentDuration;
                          setColor('#242a65');
                        }
                        setCustomDuration(duration);
                        const currentDayAppointments = getDayAppointments(
                          event.target.value,
                          appointmentDelay,
                          duration,
                          futurAppointments,
                          oppeningHours,
                        );
                        setAppointments(currentDayAppointments);
                        setSelectedDay(event.target.value);
                      }}
                      label="Date"
                      inputProps={{
                        name: 'date',
                        id: 'date',
                      }}
                    >
                      {dayList.map((day) => (
                        <MenuItem value={day} key={day}>
                          {`${days[day.getDay()]} ${day.getDate()} ${months[day.getMonth()]}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="hour">Heure</InputLabel>
                    <Select
                      value={time}
                      onChange={(event) => {
                        const actualDay = new Date(selectedDay);
                        setTime(event.target.value);
                        const newAppointment = `${actualDay.getFullYear()}/${(`0${actualDay.getMonth() + 1}`).substr(-2)}/${actualDay.getDate()} ${event.target.value}`;
                        selectCurrentAppointment(new Date(newAppointment));
                      }}
                      label="Heure"
                      inputProps={{
                        name: 'hour',
                        id: 'hour',
                      }}
                    >
                      {appointments.length > 0 && appointments.map((meet) => (
                        <MenuItem value={`${(`0${meet.getHours()}`).substr(-2)}:${(`0${meet.getMinutes()}`).substr(-2)}`} key={Date.parse(meet)}>
                          {`${(`0${meet.getHours()}`).substr(-2)}:${(`0${meet.getMinutes()}`).substr(-2)}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
              {(dayList.length < 1 || !selectedDay || !onlineAppointment) && (
                <DialogContentText>
                  Aucun rendez-vous n'est disponible à la réservation pour le moment
                </DialogContentText>
              )}

            </div>
          </DialogContent>
        </>
      )}
      {activeStep === 1 && isLogged && <DialogTitle id="form-dialog-title">Vos coordonnées</DialogTitle>}
      {activeStep === 1 && !isLogged && newAccountToggle && (
        <>
          <DialogTitle id="form-dialog-title">
            Connexion
          </DialogTitle>
          <Button
            color="primary"
            onClick={() => {
              setNewAccountToggle(false);
            }}
          >
            Pas encore inscrit? Creer un compte
          </Button>
        </>
      )}
      {activeStep === 1 && !isLogged && !newAccountToggle && <DialogTitle id="form-dialog-title">Créez un compte</DialogTitle>}
      {activeStep === 1 && !isLogged && (
        // formulaire de connection
        <div className="HomePageModal-content-connect">
          {newAccountToggle && (
            <>
              <ConnectForm />
              <Button
                color="primary"
                onClick={() => {
                  setOpenRenew(true);
                }}
              >
                Mot de passe oublié
              </Button>
            </>
          )}

          {!newAccountToggle && (
            // formulaire de creation de compte
            <>
              <NewUserForm />
              <Button
                color="primary"
                onClick={() => {
                  setNewAccountToggle(true);
                }}
              >
                Déja inscrit ? Connectez-vous
              </Button>
            </>
          )}
        </div>
      )}
      <div className="homePageModal-content-buttonContainer">
        {activeStep === 1 && isLogged && (
          <DialogContent dividers>
            <DialogContent>
              <DialogContentText>
                Nom: {userDatas.lastname}
              </DialogContentText>
              <DialogContentText>
                Prénom: {userDatas.firstname}
              </DialogContentText>
              <DialogContentText>
                N° de téléphone: {userDatas.phone}
              </DialogContentText>
              <DialogContentText>
                Email: {userDatas.email}
              </DialogContentText>
            </DialogContent>
            {activeStep === 1 && (
              <Button
                color="primary"
                onClick={() => {
                  logoutUser();
                  setNewAccountToggle(true);
                }}
              >
                Me connecter à un autre compte
              </Button>

            )}
          </DialogContent>
        )}
      </div>
      { activeStep === 2 && isLogged && (
        <DialogContent dividers>
          <DialogContent>
            <DialogTitle id="form-dialog-title">Votre rendez-vous</DialogTitle>
            <DialogContentText>
              {`${userDatas.firstname} ${userDatas.lastname}, `}
            </DialogContentText>
            <DialogContentText>
              Vous souhaitez prendre rendez-vous le:
            </DialogContentText>
            <DialogContentText>
              {` ${days[appointment.getDay()]} `}
              {`${appointment.getDate()} `}
              {`${months[appointment.getMonth()]} `}
              {appointment.getFullYear()}
            </DialogContentText>
            <DialogContentText>
              à:
            </DialogContentText>
            <DialogContentText>
              {` ${(`0${appointment.getHours()}`).substr(-2)}H${(`0${appointment.getMinutes()}`).substr(-2)}`}
            </DialogContentText>
          </DialogContent>
        </DialogContent>
      )}
    </div>
  );
};

HomePageModal.propTypes = {
  userDatas: PropTypes.object.isRequired,
  currentAppointment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  selectCurrentAppointment: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  activeStep: PropTypes.number.isRequired,
  logoutUser: PropTypes.func.isRequired,
  selectedDay: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  appointmentDuration: PropTypes.number.isRequired,
  appointmentDelay: PropTypes.number.isRequired,
  futurAppointments: PropTypes.array.isRequired,
  oppeningDays: PropTypes.array.isRequired,
  oppeningHours: PropTypes.array.isRequired,
  onlineAppointment: PropTypes.bool,
  saveFuturAppointments: PropTypes.func.isRequired,
  doctorId: PropTypes.string.isRequired,
  appointmentPeriod: PropTypes.number.isRequired,
  setOpenRenew: PropTypes.func.isRequired,
  appointmentType: PropTypes.object.isRequired,
  parameters: PropTypes.object.isRequired,
  setAppointmentType: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setCustomDuration: PropTypes.func.isRequired,
};

HomePageModal.defaultProps = {
  onlineAppointment: false,
};

export default HomePageModal;
