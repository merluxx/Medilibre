import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TimePicker, DatePicker } from '@material-ui/pickers/';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import { CirclePicker } from 'react-color';

const ModifyModal = ({
  setAdminPageFields,
  selectedEvent,
  deleteSelectedAppointment,
  modifiedAppointmentStart,
  modifiedAppointmentEnd,
  modifiedAppointmentId,
  modifySelectedAppointment,
  modifiedEventColorPickerShow,
  modifiedAppointmentColor,
}) => {
  useEffect(() => {
    setAdminPageFields('modifiedAppointmentStart', new Date(selectedEvent.start));
    setAdminPageFields('modifiedAppointmentEnd', new Date(selectedEvent.end));
    setAdminPageFields('modifiedAppointmentUserId', selectedEvent.userId);
    setAdminPageFields('modifiedAppointmentId', selectedEvent.id);
    if (selectedEvent.color) {
      setAdminPageFields('modifiedAppointmentColor', selectedEvent.color);
    }
    else {
      setAdminPageFields('modifiedAppointmentColor', '#242a66');
    }
  }, []);

  const disabled = !selectedEvent.isHoliday;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        modifySelectedAppointment();
      }}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Modification du Rendez-vous
      </DialogTitle>

      {!selectedEvent.isDomicile && !selectedEvent.isHoliday && (
        <>
          <DialogContent>
            Couleur
          </DialogContent>
          <DialogContent
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!modifiedEventColorPickerShow && (
              <div
                style={{
                  width: '100%',
                  height: 28,
                  backgroundColor: modifiedAppointmentColor,
                }}
                onClick={() => {
                  setAdminPageFields('modifiedEventColorPickerShow', true);
                }}
              />
            )}
            {modifiedEventColorPickerShow && (
              <CirclePicker
                onChange={(color) => {
                  setAdminPageFields('modifiedEventColorPickerShow', false);
                  setAdminPageFields('modifiedAppointmentColor', color.hex);
                }}
                colors={
                  ['#242a66', '#F0F', '#F4D06F', '#FF8811', '#9DD9D2', '#C9E4E7', '#343434', '#FFE66D', '#5E4AE3', '#F0A7A0', '#6CA054']
                }
              />
            )}
          </DialogContent>
        </>
      )}
      {modifiedAppointmentId && (
        <>
          {selectedEvent.isHoliday && (
            <DialogContent>
              {selectedEvent.title}
            </DialogContent>
          )}
          {!selectedEvent.isHoliday && (
            <DialogContent>
              Patient: {selectedEvent.title}
            </DialogContent>
          )}
          {selectedEvent.isDomicile && (
            <DialogContent
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <DriveEtaOutlinedIcon
                style={{
                  marginRight: '.5rem',
                }}
              />
              Domicile
            </DialogContent>
          )}
          <DialogContent>
            Debut
          </DialogContent>
          <DialogContent>
            <DatePicker
              okLabel="Ok"
              clearLabel="Effacer"
              cancelLabel="Annuler"
              margin="normal"
              id="date-picker-dialog-start"
              label="Jour"
              format="dd/MM/yyyy"
              value={modifiedAppointmentStart}
              onChange={(event) => {
                setAdminPageFields('modifiedAppointmentStart', new Date(event.ts));
                if (disabled) {
                  const endTs = Date.parse(modifiedAppointmentEnd);
                  const endDate = new Date(endTs);
                  endDate.setDate(new Date(event.ts).getDate());
                  endDate.setMonth(new Date(event.ts).getMonth());
                  endDate.setFullYear(new Date(event.ts).getFullYear());
                  setAdminPageFields('modifiedAppointmentEnd', endDate);
                }
              }}
            />
            <TimePicker
              okLabel="Ok"
              clearLabel="Effacer"
              cancelLabel="Annuler"
              margin="normal"
              id="time-picker-start"
              label="Debut"
              ampm={false}
              value={modifiedAppointmentStart}
              onChange={(event) => {
                setAdminPageFields('modifiedAppointmentStart', new Date(event.ts));
              }}
            />
          </DialogContent>
          <DialogContent>
            Fin
          </DialogContent>
          <DialogContent>
            <DatePicker
              disabled={disabled}
              okLabel="Ok"
              clearLabel="Effacer"
              cancelLabel="Annuler"
              margin="normal"
              id="date-picker-dialog-end"
              label="Jour"
              format="dd/MM/yyyy"
              value={modifiedAppointmentEnd}
              onChange={(event) => {
                if (new Date(event.ts) > modifiedAppointmentStart) {
                  setAdminPageFields('modifiedAppointmentEnd', new Date(event.ts));
                }
              }}
            />
            <TimePicker
              okLabel="Ok"
              clearLabel="Effacer"
              cancelLabel="Annuler"
              margin="normal"
              id="time-picker-end"
              label="Fin"
              ampm={false}
              value={modifiedAppointmentEnd}
              onChange={(event) => {
                if (new Date(event.ts) > modifiedAppointmentStart) {
                  setAdminPageFields('modifiedAppointmentEnd', new Date(event.ts));
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setAdminPageFields('openModifyModal', false);
              }}
              color="primary"
            >
              Retour
            </Button>
            <Button
              autoFocus
              onClick={() => {
                deleteSelectedAppointment(modifiedAppointmentId);
                setAdminPageFields('openModifyModal', false);
              }}
              color="secondary"
            >
              Supprimer
            </Button>
            <Button type="submit" color="primary">
              Modifier
            </Button>
          </DialogActions>
        </>
      )}
    </form>
  );
};

ModifyModal.propTypes = {
  selectedEvent: PropTypes.object.isRequired,
  setAdminPageFields: PropTypes.func.isRequired,
  deleteSelectedAppointment: PropTypes.func.isRequired,
  modifiedAppointmentStart: PropTypes.object.isRequired,
  modifiedAppointmentEnd: PropTypes.object.isRequired,
  modifiedAppointmentId: PropTypes.string.isRequired,
  modifySelectedAppointment: PropTypes.func.isRequired,
  modifiedEventColorPickerShow: PropTypes.bool.isRequired,
  modifiedAppointmentColor: PropTypes.string.isRequired,
};

export default ModifyModal;
