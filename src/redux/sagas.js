import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import agreementsSagas from './agreements/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    agreementsSagas()
  ]);
}