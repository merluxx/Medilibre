import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { CirclePicker } from 'react-color';

import './sessionTypes.scss';

const SessionTypes = ({
  sessionTypesState,
  sessionTypes,
  doctorDatas,
  setParametersFields,
  deleteDialogShow,
  editDialogShow,
  currentSessionType,
  showColorPicker,
  newTypeName,
  newTypeDuration,
  newTypeColor,
  modifySessionType,
  deleteSessionType,
  addDialogShow,
  addSessionType,
}) => {
  useEffect(() => {
    setParametersFields('sessionTypes', doctorDatas.sessionType);
  }, []);

  useEffect(() => {
    const newState = {
      columns: [
        { title: 'Intitulé', field: 'name' },
        { title: 'Durée ( minutes )', field: 'duration' },
        {
          title: 'Couleur',
          field: 'color',
          render: (rowDatas) => (
            <div
              style={{
                backgroundColor: rowDatas.color,
                width: 28,
                height: 28,
                borderRadius: '50%',
              }}
            />
          ),
        },
      ],
      data: sessionTypes,
    };
    setParametersFields('sessionTypesState', newState);
  }, [sessionTypes]);

  useEffect(() => {
    if (currentSessionType.name) {
      setParametersFields('newTypeName', currentSessionType.name);
      setParametersFields('newTypeDuration', currentSessionType.duration);
      setParametersFields('newTypeFrequency', currentSessionType.frequency);
      setParametersFields('newTypeColor', currentSessionType.color);
      setParametersFields('newTypeGroupSession', currentSessionType.groupSession);
      setParametersFields('newTypeGroupSize', currentSessionType.groupSize);
    }
  }, [currentSessionType]);

  return (
    <div className="sessionTypes">
      <MaterialTable
        title="Types de séances"
        columns={sessionTypesState.columns}
        data={sessionTypesState.data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Save User',
            onClick: (event, rowData) => {
              setParametersFields('currentSessionType', rowData);
              setParametersFields('editDialogShow', true);
            },
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => {
              setParametersFields('currentSessionType', rowData);
              setParametersFields('deleteDialogShow', true);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <Dialog
        open={deleteDialogShow}
        onClose={() => {
          setParametersFields('deleteDialogShow', false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Supression de la séance type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vous êtes sur le point de supprimer me type de séance intitulé :
          </DialogContentText>
          <DialogContentText
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {` ${currentSessionType.name}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setParametersFields('deleteDialogShow', false);
            }}
            color="primary"
          >
            Retour
          </Button>
          <Button
            onClick={() => {
              deleteSessionType();
              setParametersFields('deleteDialogShow', false);
            }}
            color="secondary"
            autoFocus
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={addDialogShow}
        onClose={() => {
          setParametersFields('addDialogShow', false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ textAlign: 'center' }}
      >
        <DialogTitle id="alert-dialog-title">Création d'une séance type</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{
              textAlign: 'left',
            }}
          >
            Couleur :
          </DialogContentText>
        </DialogContent>
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!showColorPicker && (
            <div
              style={{
                width: '100%',
                height: 28,
                backgroundColor: newTypeColor,
              }}
              onClick={() => {
                setParametersFields('showColorPicker', true);
              }}
            />
          )}
          {showColorPicker && (
            <CirclePicker
              onChange={(color) => {
                setParametersFields('showColorPicker', false);
                setParametersFields('newTypeColor', color.hex);
              }}
              colors={
                ['#242a66', '#F0F', '#F4D06F', '#FF8811', '#9DD9D2', '#C9E4E7', '#343434', '#FFE66D', '#5E4AE3', '#F0A7A0', '#6CA054']
              }
            />
          )}
        </DialogContent>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Nom"
            variant="outlined"
            value={newTypeName}
            onChange={(event) => {
              setParametersFields('newTypeName', event.target.value);
            }}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            id="outlined-basic"
            type="number"
            label="Durée"
            variant="outlined"
            value={newTypeDuration}
            onChange={(event) => {
              setParametersFields('newTypeDuration', Math.round(Number(event.target.value)));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setParametersFields('addDialogShow', false);
            }}
            color="primary"
          >
            Retour
          </Button>
          <Button
            onClick={() => {
              addSessionType();
              setParametersFields('addDialogShow', false);
            }}
            color="primary"
            autoFocus
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editDialogShow}
        onClose={() => {
          setParametersFields('editDialogShow', false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ textAlign: 'center' }}
      >
        <DialogTitle id="alert-dialog-title">Modification d'une séance type</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{
              textAlign: 'left',
            }}
          >
            Couleur :
          </DialogContentText>
        </DialogContent>
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!showColorPicker && (
            <div
              style={{
                width: '100%',
                height: 28,
                backgroundColor: newTypeColor,
              }}
              onClick={() => {
                setParametersFields('showColorPicker', true);
              }}
            />
          )}
          {showColorPicker && (
            <CirclePicker
              onChange={(color) => {
                setParametersFields('showColorPicker', false);
                setParametersFields('newTypeColor', color.hex);
              }}
              colors={
                ['#242a66', '#F0F', '#F4D06F', '#FF8811', '#9DD9D2', '#C9E4E7', '#343434', '#FFE66D', '#5E4AE3', '#F0A7A0', '#6CA054']
              }
            />
          )}
        </DialogContent>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Nom"
            variant="outlined"
            value={newTypeName}
            onChange={(event) => {
              setParametersFields('newTypeName', event.target.value);
            }}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            id="outlined-basic"
            type="number"
            label="Durée"
            variant="outlined"
            value={newTypeDuration}
            onChange={(event) => {
              setParametersFields('newTypeDuration', Math.round(Number(event.target.value)));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setParametersFields('editDialogShow', false);
            }}
            color="primary"
          >
            Retour
          </Button>
          <Button
            onClick={() => {
              modifySessionType();
              setParametersFields('editDialogShow', false);
            }}
            color="primary"
            autoFocus
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SessionTypes.propTypes = {
  sessionTypesState: PropTypes.object.isRequired,
  sessionTypes: PropTypes.array.isRequired,
  setParametersFields: PropTypes.func.isRequired,
  doctorDatas: PropTypes.object.isRequired,
  deleteDialogShow: PropTypes.bool.isRequired,
  editDialogShow: PropTypes.bool.isRequired,
  currentSessionType: PropTypes.object.isRequired,
  showColorPicker: PropTypes.bool.isRequired,
  newTypeName: PropTypes.string.isRequired,
  newTypeDuration: PropTypes.number.isRequired,
  newTypeColor: PropTypes.string.isRequired,
  modifySessionType: PropTypes.func.isRequired,
  deleteSessionType: PropTypes.func.isRequired,
  addDialogShow: PropTypes.bool.isRequired,
  addSessionType: PropTypes.func.isRequired,
};


export default SessionTypes;
