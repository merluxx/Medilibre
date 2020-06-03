import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Redirect } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';

import SessionTypes from 'src/containers/Parameters/SessionTypes';

import './parameters.scss';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 617,
  },
  dialogContent: {
    maxWidth: 700,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Parameters = ({
  loading,
  duration,
  frequency,
  delay,
  start,
  end,
  setParametersFields,
  submitParameters,
  doctorDatas,
  success,
  password,
  confirmPassword,
  passwordError,
  confirmPasswordError,
  submitNewPassword,
  period,
  sessionTypesDialogShow,
  customMailTextDialog,
  customMailText,
  changeCustomMailText,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setParametersFields('success', false);
    if (doctorDatas) {
      setParametersFields('duration', doctorDatas.appointmentDuration);
      setParametersFields('frequency', doctorDatas.appointmentFrequency);
      setParametersFields('delay', doctorDatas.appointmentDelay);
      setParametersFields('start', doctorDatas.startPlanning);
      setParametersFields('end', doctorDatas.endPlanning);
      setParametersFields('groupSessions', doctorDatas.groupSessions);
      setParametersFields('groupSize', doctorDatas.groupSize);
    }
  }, [loading]);

  return (
    <>
      <div className="parameters">
        {success && <Redirect to="/planning" />}
        <div>
          {!loading && (
            <form
              className="parameters-content"
              onSubmit={(event) => {
                event.preventDefault();
                submitParameters();
              }}
            >
              <DialogTitle>
                Modification du mot de passe
              </DialogTitle>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<VpnKeyIcon />}
                style={{
                  alignSelf: 'center',
                }}
                onClick={handleClickOpen}
              >
                Modifier
              </Button>
              <DialogTitle>
                Personalisation des mails de confirmation
              </DialogTitle>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<MailOutlinedIcon />}
                style={{
                  alignSelf: 'center',
                }}
                onClick={() => {
                  setParametersFields('customMailTextDialog', true);
                }}
              >
                Personnaliser
              </Button>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DialogTitle>
                  Paramètres des séances
                </DialogTitle>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SettingsOutlinedIcon />}
                  style={{
                    alignSelf: 'center',
                  }}
                  onClick={() => {
                    setParametersFields('sessionTypesDialogShow', true);
                  }}
                >
                  Types de séances
                </Button>
                <DialogContent>
                  {!doctorDatas.sessionType && (
                    <>
                      <DialogContentText>
                        Durée totale d'une séance
                      </DialogContentText>
                      <DialogContent className={classes.dialogContent}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <TextField
                            id="outlined-basic-duration"
                            type="number"
                            value={parseInt(duration, Number)}
                            onChange={(event) => {
                              let { value } = event.target;
                              if (value < 0) {
                                value = 0;
                              }
                              setParametersFields('duration', Number(value));
                            }}
                            label="Durée"
                            variant="outlined"
                            InputProps={{
                              endAdornment: <InputAdornment position="end">Min</InputAdornment>,
                            }}
                          />
                        </FormControl>
                      </DialogContent>
                    </>
                  )}
                  <DialogContentText>
                    Delai minimum entre la prise d'un rendez-vous et le rdv
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        id="outlined-basic-fréquency"
                        type="number"
                        value={parseInt((delay / 60), Number)}
                        onChange={(event) => {
                          let { value } = event.target;
                          if (value < 0) {
                            value = 0;
                          }
                          setParametersFields('delay', (value * 60).toString());
                        }}
                        label="Delai"
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Heures</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogContentText>
                    Nombre de jours ouvert à la prise de rendez-vous
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        id="outlined-basic-fréquency"
                        type="number"
                        value={period}
                        onChange={(event) => {
                          let { value } = event.target;
                          if (value < 0) {
                            value = 0;
                          }
                          setParametersFields('period', value.toString());
                        }}
                        label="Delai"
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Jours</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogTitle>
                    Affichage de l'agenda
                  </DialogTitle>
                  <DialogContentText>
                    Taille des "pas" de l'agenda
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TextField
                        id="outlined-basic-frequency"
                        type="number"
                        value={parseInt(frequency, Number)}
                        onChange={(event) => {
                          let { value } = event.target;
                          if (value < 1) {
                            value = 1;
                          }
                          setParametersFields('frequency', Number(value));
                        }}
                        label="Delai"
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">Min</InputAdornment>,
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                  <DialogContentText>
                    Amplitude de l'affichage
                  </DialogContentText>
                  <DialogContent className={classes.dialogContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TimePicker
                        okLabel="Ok"
                        clearLabel="Effacer"
                        cancelLabel="Annuler"
                        ampm={false}
                        margin="normal"
                        id="time-picker-start"
                        label="Heure de Debut de journée"
                        value={new Date(start)}
                        onChange={(event) => {
                          setParametersFields('start', event.toString());
                        }}
                      />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <TimePicker
                        okLabel="Ok"
                        clearLabel="Effacer"
                        cancelLabel="Annuler"
                        ampm={false}
                        margin="normal"
                        id="time-picker-end"
                        label="Heure de Fin de journée"
                        value={new Date(end)}
                        onChange={(event) => {
                          setParametersFields('end', event.toString());
                        }}
                      />
                    </FormControl>
                  </DialogContent>
                </DialogContent>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: '5rem',
                  }}
                >
                  Enregistrer
                </Button>
              </MuiPickersUtilsProvider>
            </form>
          )}
        </div>
      </div>
      <Dialog
        open={customMailTextDialog}
        onClose={() => {
          setParametersFields('customMailTextDialog', false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Personnalisation du mail de confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez entrer le texte du mail de confirmation de rendez-vous de vos patients
          </DialogContentText>
          <TextField
            fullWidth
            disabled
            id="standard-multiline-disabled"
            value={`Bonjour (prenom) (nom) \n 
            Nous avons bien enregistré votre rendez-vous le (date) à (heure) avec ${doctorDatas.firstname} ${doctorDatas.lastname} votre ${doctorDatas.job}`}
            multiline
            rows={5}
            inputProps={{ 'aria-label': 'naked' }}
            variant="outlined"
            style={{
              marginBottom: '1rem',
            }}
          />
          <TextField
            fullWidth
            id="standard-multiline-static"
            label="Texte personnalisé"
            multiline
            rows={5}
            variant="outlined"
            value={customMailText}
            onChange={(event) => {
              setParametersFields('customMailText', event.target.value);
            }}
            style={{
              marginBottom: '1rem',
            }}
          />
          <TextField
            fullWidth
            disabled
            id="standard-multiline-disabled"
            value={`Pour consulter ou annuler vos rendez-vous connectez-vous sur l'historique de votre compte à l'adresse suivante:
            https://medi-libre.fr/${doctorDatas.slug}`}
            multiline
            inputProps={{ 'aria-label': 'naked' }}
            rows={5}
            variant="outlined"
            style={{
              marginBottom: '1rem',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setParametersFields('customMailTextDialog', false);
            }}
            color="primary"
          >
            Retour
          </Button>
          <Button
            onClick={() => {
              changeCustomMailText();
              setParametersFields('customMailTextDialog', false);
            }}
            color="primary"
            variant="contained"
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modification du mot de passe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez entrez votre nouveau mot de passe (min 6 caractères)
          </DialogContentText>
          <DialogContent>
            <FormControl variant="outlined" style={{ margin: '1rem' }}>
              <TextField
                error={passwordError}
                id="outlined-basic-password"
                type="password"
                value={password}
                onChange={(event) => {
                  if (event.target.value.length < 6) {
                    setParametersFields('passwordError', true);
                  }
                  else {
                    setParametersFields('passwordError', false);
                  }
                  setParametersFields('password', event.target.value);
                }}
                label="Mot de passe"
                variant="outlined"
              />
            </FormControl>
          </DialogContent>
          <DialogContent>
            <FormControl variant="outlined" style={{ margin: '1rem' }}>
              <TextField
                error={confirmPasswordError}
                id="outlined-basic-confirm"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  if (event.target.value !== password || event.target.length < 6) {
                    setParametersFields('confirmPasswordError', true);
                  }
                  else {
                    setParametersFields('confirmPasswordError', false);
                  }
                  setParametersFields('confirmPassword', event.target.value);
                }}
                label="Confirmation"
                variant="outlined"
              />
            </FormControl>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setParametersFields('passwordError', false);
              setParametersFields('password', '');
              setParametersFields('confirmPasswordError', false);
              setParametersFields('confirmPassword', '');
            }}
            color="primary"
          >
            Retour
          </Button>
          <Button
            onClick={() => {
              if (confirmPassword !== password || confirmPassword.length < 6) {
                setParametersFields('confirmPasswordError', true);
              }
              else {
                setParametersFields('confirmPasswordError', false);
              }
              if (password.length < 6) {
                setParametersFields('passwordError', true);
              }
              else {
                setParametersFields('passwordError', false);
              }
              if (!passwordError && !confirmPasswordError && password.length >= 6) {
                submitNewPassword();
                handleClose();
              }
            }}
            color="primary"
            variant="contained"
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        onClose={() => {
          setParametersFields('sessionTypesDialogShow', false);
        }}
        aria-labelledby="customized-dialog-title"
        open={sessionTypesDialogShow}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setParametersFields('sessionTypesDialogShow', false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Types de séances
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                setParametersFields('addDialogShow', true);
              }}
            >
              <AddCircleOutlineIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <SessionTypes />
      </Dialog>
    </>
  );
};

Parameters.propTypes = {
  loading: PropTypes.bool.isRequired,
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  frequency: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  setParametersFields: PropTypes.func.isRequired,
  submitParameters: PropTypes.func.isRequired,
  doctorDatas: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  passwordError: PropTypes.bool.isRequired,
  confirmPasswordError: PropTypes.bool.isRequired,
  submitNewPassword: PropTypes.func.isRequired,
  groupSessions: PropTypes.bool.isRequired,
  groupSize: PropTypes.number.isRequired,
  period: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  sessionTypesDialogShow: PropTypes.bool.isRequired,
  customMailTextDialog: PropTypes.bool.isRequired,
  customMailText: PropTypes.string.isRequired,
  changeCustomMailText: PropTypes.func.isRequired,
};

export default Parameters;
