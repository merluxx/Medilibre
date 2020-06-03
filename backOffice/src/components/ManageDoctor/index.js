/* eslint-disable no-lone-blocks */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';
import TextField from '@material-ui/core/TextField';

import './manageDoctor.scss';
import { DialogContentText } from '@material-ui/core';


const ManageDoctor = ({
  doctors,
  loading,
  setManageDoctorFields,
  tableState,
  loadDoctorFullList,
  dialogShow,
  selectedDoctor,
  deleteShow,
  confirm,
  confirmError,
  deleteDoctor,
}) => {
  useEffect(() => {
    loadDoctorFullList();
  }, []);

  useEffect(() => {
    const newTableState = {
      columns: [
        { title: 'Nom', field: 'lastname' },
        { title: 'Prénom', field: 'firstname' },
        { title: 'Métier', field: 'job' },
        { title: 'email', field: 'email', editable: 'never' },
      ],
      data: doctors,
    };
    setManageDoctorFields('tableState', newTableState);
  }, [doctors]);

  return (
    <div className="manageDoctor">
      <div className="manageDoctor-content">
        {loading && <CircularProgress />}
        {!loading && (
          <>
            <MaterialTable
              title={`${doctors.length} Comptes praticiens`}
              options={{
                pageSize: 10,
                pageSizeOptions: [10, 20, 50],
                actionsColumnIndex: -1,
              }}
              columns={tableState.columns}
              data={tableState.data}
              actions={[
                {
                  icon: 'visibilityOutlined',
                  tooltip: 'sauvegarder',
                  onClick: (event, rowData) => {
                    setManageDoctorFields('selectedDoctor', rowData);
                    setManageDoctorFields('dialogShow', true);
                  },
                },
                {
                  icon: 'deleteOutlined',
                  tooltip: 'Supprimer',
                  onClick: (event, rowData) => {
                    setManageDoctorFields('confirmError', false);
                    setManageDoctorFields('confirm', '');
                    setManageDoctorFields('selectedDoctor', rowData);
                    setManageDoctorFields('deleteShow', true);
                  },
                },
              ]}
            />
            <Dialog
              onClose={() => {
                setManageDoctorFields('dialogShow', false);
              }}
              aria-labelledby="customized-dialog-title"
              open={dialogShow}
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={() => {
                  setManageDoctorFields('dialogShow', false);
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    {selectedDoctor.firstname} {selectedDoctor.lastname}
                  </div>
                  {selectedDoctor.superAdmin && (
                    <>
                      <StarsOutlinedIcon style={{ margin: '0 1rem' }} />
                      <div>
                        Super Admin
                      </div>
                    </>
                  )}
                </span>
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText>
                  Profession: {selectedDoctor.job}
                </DialogContentText>
                <DialogContentText>
                  Email: {selectedDoctor.email}
                </DialogContentText>
                <DialogContentText>
                  Adresse: {selectedDoctor.adress} {selectedDoctor.zip} {selectedDoctor.city}
                </DialogContentText>
                <DialogContentText>
                  N° de téléphone: {selectedDoctor.phone}
                </DialogContentText>
                <DialogContentText>
                  Presentation: {selectedDoctor.presentation}
                </DialogContentText>
                <DialogContentText>
                  Page du cabinet:
                  <a
                    href={`https://medi-libre.fr/${selectedDoctor.slug}`}
                    style={{
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    }}
                  >
                    {` https://medi-libre.fr/${selectedDoctor.slug}`}
                  </a>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    setManageDoctorFields('dialogShow', false);
                  }}
                  color="primary"
                >
                  Fermer
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              onClose={() => {
                setManageDoctorFields('deleteShow', false);
              }}
              aria-labelledby="customized-dialog-title"
              open={deleteShow}
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={() => {
                  setManageDoctorFields('deleteShow', false);
                }}
              >
                supression du compte
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Vous êtes sur le point de supprimer le compte de
                  {` ${selectedDoctor.firstname}`} {selectedDoctor.lastname}
                </DialogContentText>
                <DialogContentText>
                  En êtes vous sur ? (inscrivez "OUI" avant de valider)
                </DialogContentText>
                <TextField
                  error={confirmError}
                  autoFocus
                  value={confirm}
                  id="name"
                  label="confirmer"
                  type="text"
                  onChange={(event) => {
                    setManageDoctorFields('confirmError', false);
                    if (event.target.value.trim().toLowerCase() !== 'oui') {
                      setManageDoctorFields('confirmError', false);
                    }
                    setManageDoctorFields('confirm', event.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    setManageDoctorFields('deleteShow', false);
                  }}
                  color="primary"
                >
                  Fermer
                </Button>
                <Button
                  autoFocus
                  color="secondary"
                  onClick={() => {
                    if (confirm.trim().toLowerCase() === 'oui') {
                      deleteDoctor();
                    }
                    else {
                      setManageDoctorFields('confirmError', true);
                    }
                  }}
                >
                  Supprimer
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

ManageDoctor.propTypes = {
  doctors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setManageDoctorFields: PropTypes.func.isRequired,
  tableState: PropTypes.object.isRequired,
  loadDoctorFullList: PropTypes.func.isRequired,
  dialogShow: PropTypes.bool.isRequired,
  selectedDoctor: PropTypes.object.isRequired,
  deleteShow: PropTypes.bool.isRequired,
  confirm: PropTypes.string.isRequired,
  confirmError: PropTypes.bool.isRequired,
  deleteDoctor: PropTypes.func.isRequired,
};

export default ManageDoctor;
