/**
 *
 * ManagerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import { loadSlides as loadSlidesAction } from 'containers/App/actions';
import { makeSelectSlidesIsLoading, makeSelectSlidesIsLoaded, makeSelectSlidesTree } from 'containers/App/selectors';
import Manager from 'components/Manager';

import SlidesList from 'components/SlidesList';

import makeSelectManagerPage from './selectors';
import reducer from './reducer';

export class ManagerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { isLoaded, isLoading, loadSlides } = this.props;

    if (!isLoaded && !isLoading) {
      loadSlides();
    }
    document.body.classList.add('manager');
  }
  componentWillUnmount() {
    document.body.classList.remove('manager');
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>ManagerPage</title>
          <meta name="description" content="Description of ManagerPage" />
        </Helmet>

        <Manager>
          <SlidesList
            slides={this.props.slidesTree}
          />
        </Manager>
      </div>
    );
  }
}

ManagerPage.propTypes = {
  slidesTree: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loadSlides: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managerPage: makeSelectManagerPage(),
  slidesTree: makeSelectSlidesTree(),
  isLoading: makeSelectSlidesIsLoading(),
  isLoaded: makeSelectSlidesIsLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadSlides: () => dispatch(loadSlidesAction()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managerPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(ManagerPage);
