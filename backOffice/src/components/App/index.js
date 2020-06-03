// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Analytics from 'react-router-ga';

// == Import
import Admin from 'src/containers/Admin';
import AdminHeader from 'src/containers/AdminHeader';
import Planning from 'src/containers/Planning';
import Patients from 'src/containers/Patients';
import Cabinet from 'src/containers/Cabinet';
import Parameters from 'src/containers/Parameters';
import Forgot from 'src/containers/Forgot';
import Renew from 'src/containers/Renew';
import AddDoctor from 'src/containers/AddDoctor';
import ManageDoctor from 'src/containers/ManageDoctor';
import Send from 'src/containers/Send';


import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

// == Composant
const App = ({
  isAdmin,
  flashMessage,
  checkIsAdmin,
  loading,
  getAllDoctorAppointments,
  superAdmin,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    checkIsAdmin();
    setInterval(getAllDoctorAppointments, 10000);
  }, []);
  useEffect(() => {
    if (flashMessage.length > 1) {
      enqueueSnackbar(flashMessage[0], { variant: flashMessage[1] });
    }
  }, [flashMessage]);

  return (
    <div className="app">
      {isAdmin && <AdminHeader />}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Analytics id="UA-124274086-8" debug>

        <Switch>
          <Route path="/" exact>
            {!loading && (
              <>
                {!isAdmin && <Admin />}
                {isAdmin && <Redirect to="/planning" />}
              </>
            )}
          </Route>
          <Route path="/forgot-password" exact>
            {!loading && (
              <>
                {!isAdmin && <Forgot />}
                {isAdmin && <Redirect to="/planning" />}
              </>
            )}
          </Route>
          <Route path="/renew/:token" exact>
            {!loading && (
              <>
                {!isAdmin && <Renew />}
                {isAdmin && <Redirect to="/planning" />}
              </>
            )}
          </Route>
          <Route path="/planning" exact>
            {!loading && (
              <>
                {isAdmin && <Planning />}
                {!isAdmin && <Redirect to="/" />}
              </>
            )}
          </Route>
          <Route path="/patients" exact>
            {!loading && (
              <>
                {isAdmin && <Patients />}
                {!isAdmin && <Redirect to="/" />}
              </>
            )}
          </Route>
          <Route path="/cabinet" exact>
            {!loading && (
              <>
                {isAdmin && <Cabinet />}
                {!isAdmin && <Redirect to="/" />}
              </>
            )}
          </Route>
          <Route path="/parametres" exact>
            {!loading && (
              <>
                {isAdmin && <Parameters />}
                {!isAdmin && <Redirect to="/" />}
              </>
            )}
          </Route>
          <Route path="/addDoctor" exact>
            {!loading && (
              <>
                {isAdmin && superAdmin && <AddDoctor />}
                {!isAdmin && superAdmin && <Redirect to="/" />}
              </>
            )}
          </Route>
          <Route path="/manageDoctor" exact>
            {!loading && (
              <>
                {isAdmin && superAdmin && <ManageDoctor />}
                {!isAdmin && superAdmin && <Redirect to="/" />}
              </>
            )}
          </Route>
          <Route path="/send" exact>
            {!loading && (
              <>
                {isAdmin && superAdmin && <Send />}
                {!isAdmin && superAdmin && <Redirect to="/" />}
              </>
            )}
          </Route>
          <Route>
            <div>
              Page 404
            </div>
          </Route>
        </Switch>
      </Analytics>
    </div>
  );
};

App.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  flashMessage: PropTypes.array.isRequired,
  checkIsAdmin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getAllDoctorAppointments: PropTypes.func.isRequired,
  superAdmin: PropTypes.bool,
};

App.defaultProps = {
  superAdmin: false,
};

// == Export
export default App;
