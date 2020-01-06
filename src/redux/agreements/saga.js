import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getDateWithFormat } from "../../helpers/Utils";
import axios from 'axios';

import { AGREEMENT_GET_LIST, AGREEMENT_ADD_ITEM, AGREEMENT_DELETE_ITEM, AGREEMENT_SEARCH } from "../actions";
import { servicePath } from '../../constants/defaultValues';

import {
  getAgreementListSuccess,
  getAgreementListError,
  addAgreementItemSuccess,
  addAgreementItemError,
  deleteAgreementItemSuccess,
  deleteAgreementItemError,
  searchAgreementsSuccess,
  searchAgreementsError,
  unauthorizedAgreement,
} from "./actions";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = localStorage.getItem('token');
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const getAgreementListRequest = async () => {
  return await axios.get( servicePath + '/api/convenios')
    .then(agreements => agreements)
    .catch(error => error);   
};

function* getAgreementListItems() {
  try {
    const agreements = yield call(getAgreementListRequest);
    if (!agreements.response){
      yield put(getAgreementListSuccess(agreements));
    } else {
      yield put(unauthorizedAgreement());  
    }
  } catch (error) {
    yield put(getAgreementListError(error));
  }
}

const addAgreementItemRequest = async (item) => {
  let agreements = await axios.post( servicePath + '/api/convenios', item)
    .then(() =>  {
      return axios.get(servicePath + '/api/convenios')
        .then(agreements => agreements)
        .catch(error => error);
    })
    .catch(error => error);
  if(!agreements.data) {
    return agreements.response.data;
  } else {
    return agreements.data;
  }
};

function* addAgreementItem({ payload }) {
  try {
    const response = yield call(addAgreementItemRequest, payload);
    if(!response.message){
      yield put(addAgreementItemSuccess(response));
    } else {
      yield put(addAgreementItemError(response.message));  
    }
  } catch (error) {
    yield put(addAgreementItemError(error));
  }
}

const deleteAgreementItemRequest = async (item) => {
  let agreements = await axios.post( servicePath + '/api/convenios/add', item)
    .then(() =>  {
      return axios.get(servicePath + '/api/convenios')
        .then(agreements => agreements)
        .catch(error => error);
    })
    .catch(error => error);
  return agreements.data;
};

function* deleteAgreementItem({ payload }) {
  try {
    const response = yield call(deleteAgreementItemRequest, payload);
    yield put(deleteAgreementItemSuccess(response));
  } catch (error) {
    yield put(deleteAgreementItemError(error));
  }
}

const searchAgreementsRequest = async (item) => {
  let agreements = await axios.get( servicePath + '/api/convenios?query=%7B%22' + item.keyword + '%22%3A%22'+ item.value +'%22%7D' )
    .then(agreements => agreements)
    .catch(error => error);
  if(!agreements.data) {
    return agreements.response.data;
  } else {
    return agreements.data;
  }
};

function* searchAgreements({ payload }) {
  try {
    const response = yield call(searchAgreementsRequest, payload);
    if(!response.message){
      yield put(searchAgreementsSuccess(response));
    } else {
      yield put(searchAgreementsError(response.message));
    }
  } catch (error) {
    yield put(searchAgreementsError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(AGREEMENT_GET_LIST, getAgreementListItems);
}

export function* wathcAddItem() {
  yield takeEvery(AGREEMENT_ADD_ITEM, addAgreementItem);
}

export function* wathcDeleteItem() {
  yield takeEvery(AGREEMENT_DELETE_ITEM, deleteAgreementItem);
}

export function* watchSearchAgreements() {
  yield takeEvery(AGREEMENT_SEARCH, searchAgreements);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcDeleteItem), fork(watchSearchAgreements)]);
}