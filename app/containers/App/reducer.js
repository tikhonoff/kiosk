/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
  LOAD_SLIDES_ACTION,
  SLIDES_LOADED_ACTION,
  SLIDES_LOAD_ERROR_ACTION,
  APPEND_NEW_SLIDE_ACTION,
} from './constants';

const initialState = fromJS({
  slides: {
    isLoading: false,
    isLoaded: false,
    all: [],
    errorMessage: '',
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case APPEND_NEW_SLIDE_ACTION:
      return state.setIn(
        ['slides', 'all'],
        state.getIn(['slides', 'all']).push(fromJS(action.slide))
      );
    case SLIDES_LOAD_ERROR_ACTION:
      return state
        .setIn(['slides', 'isLoaded'], false)
        .setIn(['slides', 'isLoading'], false)
        .setIn(['slides', 'message'], action.error.message);
    case SLIDES_LOADED_ACTION:
      return state
        .setIn(['slides', 'all'], fromJS(action.slides))
        .setIn(['slides', 'isLoaded'], true)
        .setIn(['slides', 'isLoading'], false);
    case LOAD_SLIDES_ACTION:
      return state.setIn(['slides', 'isLoading'], true);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default appReducer;
