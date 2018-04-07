/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AppContainer, { SlideBlock } from 'components/AppContainer';

import {
  makeSelectSlidesTree,
  makeSelectSlidesIsLoading,
  makeSelectSlidesIsLoaded,
} from 'containers/App/selectors';

import { loadSlides as loadSlidesAction } from 'containers/App/actions';

import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { changeSlide as changeSlideAction } from './actions';
import previewImage from '../../images/slideshow.png';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { isLoaded, isLoading, loadSlides } = this.props;

    if (!isLoaded && !isLoading) {
      loadSlides();
    }
  }
  render() {
    const { currentSlideIndex } = this.props.homePage;
    const selectedSlide = currentSlideIndex !== -1 ? this.props.slidesTree[currentSlideIndex] : null;

    return (
      <div>
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>

        <AppContainer
          slides={this.props.slidesTree}
          onClickSlide={this.props.changeSlide}
        >
          {!selectedSlide &&
            <SlideBlock>
              <h1>Explore Earth, Space, and More with Science On a Sphere<sup>®</sup>!</h1>
              <img src={previewImage} alt="Preview" />
              <h3>Explore using the touch-screen nearest the entrance.</h3>
            </SlideBlock>
          }
          {selectedSlide &&
            <SlideBlock>
              <h1>{selectedSlide.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: selectedSlide.content }} />
            </SlideBlock>
          }
        </AppContainer>
      </div>
    );
  }
}

HomePage.propTypes = {
  homePage: PropTypes.object.isRequired,
  slidesTree: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loadSlides: PropTypes.func.isRequired,
  changeSlide: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  slidesTree: makeSelectSlidesTree(),
  isLoading: makeSelectSlidesIsLoading(),
  isLoaded: makeSelectSlidesIsLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadSlides: () => dispatch(loadSlidesAction()),
    changeSlide: (index) => dispatch(changeSlideAction(index)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
