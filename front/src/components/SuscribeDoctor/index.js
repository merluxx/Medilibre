import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './suscribeDoctor.scss';
import {
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Button,
} from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const SuscribeDoctor = ({
  firstname,
  lastname,
  email,
  job,
  adress,
  zip,
  city,
  password,
  confirmPassword,
  firstnameError,
  lastnameError,
  emailError,
  jobError,
  adressError,
  zipError,
  cityError,
  passwordError,
  confirmPasswordError,
  setSuscribeDoctorFields,
  submitDoctorSuscribeForm,
}) => {
  const classes = useStyles();

  return (
    <div className="suscribeDoctor">
      <form
        className="suscribeDoctor-content"
        onSubmit={(event) => {
          event.preventDefault();
          let error = false;
          if (firstname.length < 3) {
            setSuscribeDoctorFields('firstnameError', true);
            error = true;
          }
          if (lastname.length < 3) {
            setSuscribeDoctorFields('lastnameError', true);
            error = true;
          }
          if (job.length < 3) {
            setSuscribeDoctorFields('jobError', true);
            error = true;
          }
          const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          if (!mailRegEx.test(email)) {
            setSuscribeDoctorFields('emailError', true);
            error = true;
          }
          const codepostal = /^(([0-9][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/;
          if (!codepostal.test(zip)) {
            setSuscribeDoctorFields('zipError', true);
            error = true;
          }
          if (adress.length < 3) {
            setSuscribeDoctorFields('adressError', true);
            error = true;
          }
          if (city.length < 3) {
            setSuscribeDoctorFields('cityError', true);
            error = true;
          }
          if (password.length < 6) {
            setSuscribeDoctorFields('passwordError', true);
            error = true;
          }
          if (confirmPassword.length < 6 || confirmPassword !== password) {
            setSuscribeDoctorFields('confirmPasswordError', true);
            error = true;
          }
          if (!error) {
            submitDoctorSuscribeForm();
          }
        }}
      >
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<ArrowBackOutlinedIcon />}
          style={{
            alignSelf: 'flex-start',
            marginTop: '1rem',
          }}
        >
          <Link to="/">
            retour
          </Link>
        </Button>
        <DialogContent>
          <DialogTitle>
            MediLibre
          </DialogTitle>
          <DialogContentText>
            MédiLibre est une plateforme de prise de rendez-vous
            en ligne pour professionnels du Soins.
          </DialogContentText>
          <DialogContentText>
            Cette plateforme est libre de droit et son code source ouvert
            à tous peut être consulté et téléchargé à l'adrese suivante:
            <a href="https://github.com/Martin-Brunel/Medilibre">https://github.com/Martin-Brunel/Medilibre</a>
          </DialogContentText>
          <DialogContentText>
            Si vous souhaitez tester ou utiliser l'application directement et
            sans l'instaler sur votre serveur vous pouvez vous inscrire ici.
            la création et l'utilisation de la plateforme est gratuite
            et sans engagement de votre part.
          </DialogContentText>
          <DialogTitle>
            Formulaire d'inscription
          </DialogTitle>
          <DialogContent>
            <TextField
              error={firstnameError}
              value={firstname}
              label="Prenom"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('firstnameError', false);
                if (event.target.value.length < 3) {
                  setSuscribeDoctorFields('firstnameError', true);
                }
                setSuscribeDoctorFields('firstname', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={lastnameError}
              value={lastname}
              label="Nom"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('lastnameError', false);
                if (event.target.value.length < 3) {
                  setSuscribeDoctorFields('lastnameError', true);
                }
                setSuscribeDoctorFields('lastname', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={emailError}
              value={email}
              type="email"
              label="Adresse Email valide"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('emailError', false);
                const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                if (!mailRegEx.test(event.target.value)) {
                  setSuscribeDoctorFields('emailError', true);
                }
                setSuscribeDoctorFields('email', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={jobError}
              value={job}
              label="Profession"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('jobError', false);
                if (event.target.value.length < 3) {
                  setSuscribeDoctorFields('jobError', true);
                }
                setSuscribeDoctorFields('job', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={adressError}
              value={adress}
              label="Adresse"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('adressError', false);
                if (event.target.value.length < 3) {
                  setSuscribeDoctorFields('adressError', true);
                }
                setSuscribeDoctorFields('adress', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={zipError}
              value={zip}
              label="Code Postal"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('zipError', false);
                const codepostal = /^(([0-9][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/;
                if (!codepostal.test(event.target.value)) {
                  setSuscribeDoctorFields('zipError', true);
                }
                setSuscribeDoctorFields('zip', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={cityError}
              value={city}
              label="Ville"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('cityError', false);
                if (event.target.value.length < 3) {
                  setSuscribeDoctorFields('cityError', true);
                }
                setSuscribeDoctorFields('city', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={passwordError}
              value={password}
              type="password"
              label="Mot de passe"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('passwordError', false);
                if (event.target.value.length < 6) {
                  setSuscribeDoctorFields('passwordError', true);
                }
                setSuscribeDoctorFields('password', event.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              error={confirmPasswordError}
              value={confirmPassword}
              type="password"
              label="Confirmation du Mot de passe"
              variant="outlined"
              onChange={(event) => {
                setSuscribeDoctorFields('confirmPasswordError', false);
                if (event.target.value.length < 6 || event.target.value !== password) {
                  setSuscribeDoctorFields('confirmPasswordError', true);
                }
                setSuscribeDoctorFields('confirmPassword', event.target.value);
              }}
            />
          </DialogContent>
        </DialogContent>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendOutlinedIcon />}
          style={{
            alignSelf: 'flex-end',
            marginTop: '1rem',
          }}
        >
          envoyer
        </Button>
      </form>
    </div>
  );
};

SuscribeDoctor.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setSuscribeDoctorFields: PropTypes.func.isRequired,
  firstnameError: PropTypes.bool.isRequired,
  lastnameError: PropTypes.bool.isRequired,
  emailError: PropTypes.bool.isRequired,
  jobError: PropTypes.bool.isRequired,
  adressError: PropTypes.bool.isRequired,
  zipError: PropTypes.bool.isRequired,
  cityError: PropTypes.bool.isRequired,
  submitDoctorSuscribeForm: PropTypes.func.isRequired,
  passwordError: PropTypes.bool.isRequired,
  confirmPasswordError: PropTypes.bool.isRequired,
};

export default SuscribeDoctor;
