import { connect } from 'react-redux';

import { validNewDoctorEmail } from 'src/actions/new';

import New from 'src/components/New';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state) => ({
  validAccount: state.new.validAccount,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  validNewDoctorEmail: (id) => {
    dispatch(validNewDoctorEmail(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(New);
