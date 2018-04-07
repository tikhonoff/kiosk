import { takeLatest, select } from 'redux-saga/effects';
import { makeSelectSlidesTree } from 'containers/App/selectors';
import { CHANGE_SLIDE_ACTION } from './constants';
import makeSelectHomePage from './selectors';
import { emitCommand } from '../../utils/socket';

export function* emitIdentifier() {
  const slides = yield select(makeSelectSlidesTree());
  const homePageState = yield select(makeSelectHomePage());
  const { currentSlideIndex } = homePageState;
  const slide = slides[currentSlideIndex];

  if (slide) {
    if (!emitCommand(slide.internalIdent)) {
      console.warn('Emit command failed, sockets inactive.');
    }
  }
}

export default function* homePageSaga() {
  yield takeLatest(CHANGE_SLIDE_ACTION, emitIdentifier);
}
