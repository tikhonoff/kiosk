import { takeLatest, call, put } from 'redux-saga/effects';
import get from 'utils/request';

import {
  LOAD_SLIDES_ACTION,
} from './constants';

import {
  slidesLoaded,
  slidesLoadError,
} from './actions';

import config from '../../config';

// Individual exports for testing
export function* loadSlides() {
  try {
    const resp = yield call(get, config.api.slides);
    yield put(slidesLoaded(resp.data));
  } catch (err) {
    yield put(slidesLoadError(err));
  }
}

// Saga for load globally data
export default function* rootSaga() {
  yield takeLatest(LOAD_SLIDES_ACTION, loadSlides);
}
