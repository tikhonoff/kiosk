/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SLIDE_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeSlide(slideIndex) {
  return {
    type: CHANGE_SLIDE_ACTION,
    slideIndex,
  };
}
