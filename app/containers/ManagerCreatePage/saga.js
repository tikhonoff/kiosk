import { takeLatest, select, call, put } from 'redux-saga/effects';
import { post } from 'utils/request';
import { appendNewSlide } from 'containers/App/actions';
import { SUBMIT_ACTION } from './constants';
import makeSelectManagerCreatePage from './selectors';
import config from '../../config';

export function* create() {
  const stateData = yield select(makeSelectManagerCreatePage());
  const { title, parent, content, icon, internalIdent } = stateData;

  try {
    const keyId = '_id';
    const resp = yield call(post, config.api.slides, {
      title,
      parent,
      content,
      icon: icon ? icon[keyId] : null,
      internalIdent,
    });

    yield put(appendNewSlide(resp.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* managerCreatePageSaga() {
  yield takeLatest(SUBMIT_ACTION, create);
}
