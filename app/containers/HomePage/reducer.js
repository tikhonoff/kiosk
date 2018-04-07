/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_SLIDE_ACTION,
} from './constants';

const initialState = fromJS({
  currentSlideIndex: -1,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SLIDE_ACTION:
      return state.set('currentSlideIndex', action.slideIndex);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default homePageReducer;
