import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';


import './send.scss';

const Send = ({
  subject,
  content,
  setSendFields,
  submitNewsletter,
}) => (
  <div className="send">
    <form
      className="send-content"
      onSubmit={(event) => {
        event.preventDefault();
        submitNewsletter();
      }}
    >
      <DialogTitle>
        NewsLetter
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ce formulaire permet d'envoyer un message à l'enssemble des praticiens de la plateforme
        </DialogContentText>
        <DialogContent
          style={{
            marginBottom: '1rem',
            padding: '.5rem',
          }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Sujet du message"
            variant="outlined"
            value={subject}
            onChange={(event) => {
              setSendFields('subject', event.target.value);
            }}
          />
        </DialogContent>
        <DialogContentText
          style={{
            textAlign: 'left',
            paddingLeft: '.5rem',
          }}
        >
          Bonjour "prenom" "nom"
        </DialogContentText>
        <DialogContent
          style={{
            marginBottom: '1rem',
            padding: '.5rem',
          }}
        >
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Contenu du courriel"
            multiline
            rows={8}
            variant="outlined"
            value={content}
            onChange={(event) => {
              setSendFields('content', event.target.value);
            }}
          />
        </DialogContent>
        <DialogContentText
          style={{
            textAlign: 'left',
            paddingLeft: '.5rem',
          }}
        >
          A bientot sur MediLibre
        </DialogContentText>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendOutlinedIcon />}
          >
            Envoyer
          </Button>
        </DialogActions>
      </DialogContent>

    </form>
  </div>
);

Send.propTypes = {
  subject: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  setSendFields: PropTypes.func.isRequired,
  submitNewsletter: PropTypes.func.isRequired,
};

export default Send;
