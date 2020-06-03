import { connect } from 'react-redux';

import { setSendFields, submitNewsletter } from 'src/actions/send';

import Send from 'src/components/Send';

const mapStateToProps = (state) => ({
  subject: state.send.subject,
  content: state.send.content,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  setSendFields: (field, value) => {
    dispatch(setSendFields(field, value));
  },
  submitNewsletter: () => {
    dispatch(submitNewsletter());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Send);
