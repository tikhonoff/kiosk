/*
 *
 * ManagerPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_SLIDES_ACTION,
  SLIDES_LOADED_ACTION,
  SLIDES_LOAD_ERROR_ACTION,
  APPEND_NEW_SLIDE_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadSlides() {
  return {
    type: LOAD_SLIDES_ACTION,
  };
}

export function slidesLoaded(slides) {
  return {
    type: SLIDES_LOADED_ACTION,
    slides,
  };
}

export function slidesLoadError(error) {
  return {
    type: SLIDES_LOAD_ERROR_ACTION,
    error,
  };
}

export function appendNewSlide(slide) {
  return {
    type: APPEND_NEW_SLIDE_ACTION,
    slide,
  };
}
