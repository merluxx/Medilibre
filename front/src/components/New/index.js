import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';

import './new.scss';
import {
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const New = ({
  validNewDoctorEmail,
  validAccount,
}) => {
  const { newDoctorId } = useParams();
  const classes = useStyles();

  return (
    <div className="new">
      <form
        className="new-content"
        onSubmit={(event) => {
          event.preventDefault();
          validNewDoctorEmail(newDoctorId);
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
            Confirmation de votre adresse mail
          </DialogTitle>
          {validAccount && (
            <Button
              type="submit"
              color="primary"
              className={classes.button}
              style={{
                alignSelf: 'flex-start',
                marginTop: '1rem',
              }}
            >
              <a href="https://medi-libre.fr/admin">
                Page de connexion
              </a>
            </Button>
          )}
          {!validAccount && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              style={{
                alignSelf: 'flex-start',
                marginTop: '1rem',
              }}
            >
              Confirmer
            </Button>
          )}
        </DialogContent>
      </form>
    </div>
  );
};

New.propTypes = {
  validNewDoctorEmail: PropTypes.func.isRequired,
  validAccount: PropTypes.bool.isRequired,
};

export default New;
