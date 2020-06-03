/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import './appointments.scss';

const useStyles = makeStyles(() => ({
  appBar: {
    position: 'relative',
  },
}));

const Appointments = ({
  appointmentsList,
  getUserAppointments,
  setOpenHistoric,
  tableState,
  setAppointmentsPageFields,
  deleteDialogShow,
  selectedAppointment,
  deleteAppointment,
}) => {
  useEffect(() => {
    getUserAppointments();
  }, []);

  useEffect(() => {
    const newList = appointmentsList.map((appointment) => {
      const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
      const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
      const start = new Date(appointment.startTime);
      const duration = `${Math.round((appointment.endTime - appointment.startTime) / 60000)} min`;
      const date = `${days[start.getDay()]} ${start.getDate()} ${months[start.getMonth()]} à ${(`0${start.getHours()}`).substr(-2)}:${(`0${start.getMinutes()}`).substr(-2)}`;
      return {
        ...appointment,
        date,
        duration,
        professional: appointment.doctorName,
      };
    });
    const newTable = {
      columns: [
        { title: 'Date', field: 'date' },
        { title: 'Durée', field: 'duration' },
        { title: 'Professionnel', field: 'professional' },
      ],
      data: newList,
    };
    setAppointmentsPageFields('tableState', newTable);
  }, [appointmentsList]);

  const classes = useStyles();

  return (
    <>
      <div className="appointments">
        <AppBar
          className={classes.appBar}
          style={{
            backgroundColor: '#242a65',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpenHistoric(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Mes rendez-vous
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="appointments-content">
          <MaterialTable
            title="Liste de mes rendez-vous"
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 20, 50],
              actionsColumnIndex: -1,
            }}
            columns={tableState.columns}
            data={tableState.data}
            actions={[
              (rowData) => ({
                icon: 'deleteOutlined',
                tooltip: 'Supprimer',
                // eslint-disable-next-line no-shadow
                onClick: (event, rowData) => {
                  setAppointmentsPageFields('selectedAppointment', rowData);
                  setAppointmentsPageFields('deleteDialogShow', true);
                },
                disabled: rowData.startTime < Date.now(),
              }),
            ]}
          />
        </div>
      </div>
      <Dialog
        open={deleteDialogShow}
        onClose={() => {
          setAppointmentsPageFields('deleteDialogShow', false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Annulation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous êtes sur le point d'annuler votre rendez-vous du
          </DialogContentText>
          <DialogContentText
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {selectedAppointment.date}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAppointmentsPageFields('deleteDialogShow', false);
            }}
            color="primary"
          >
            Retour
          </Button>
          <Button
            onClick={() => {
              setAppointmentsPageFields('deleteDialogShow', false);
              // eslint-disable-next-line no-underscore-dangle
              deleteAppointment(selectedAppointment._id);
            }}
            color="secondary"
            autoFocus
          >
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Appointments.propTypes = {
  appointmentsList: PropTypes.array.isRequired,
  getUserAppointments: PropTypes.func.isRequired,
  setOpenHistoric: PropTypes.func.isRequired,
  tableState: PropTypes.object.isRequired,
  setAppointmentsPageFields: PropTypes.func.isRequired,
  deleteDialogShow: PropTypes.bool.isRequired,
  selectedAppointment: PropTypes.object.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
};

export default Appointments;
