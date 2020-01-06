import {
    AGREEMENT_UNAUTHORIZED,
    AGREEMENT_GET_LIST,
    AGREEMENT_GET_LIST_SUCCESS,
    AGREEMENT_GET_LIST_ERROR,
    AGREEMENT_GET_LIST_WITH_FILTER,
    AGREEMENT_GET_LIST_WITH_ORDER,
    AGREEMENT_GET_LIST_SEARCH,
    AGREEMENT_ADD_ITEM,
    AGREEMENT_ADD_ITEM_SUCCESS,
    AGREEMENT_ADD_ITEM_ERROR,
    AGREEMENT_DELETE_ITEM,
    AGREEMENT_DELETE_ITEM_SUCCESS,
    AGREEMENT_DELETE_ITEM_ERROR,
    AGREEMENT_SEARCH,
    AGREEMENT_SEARCH_SUCCESS,
    AGREEMENT_SEARCH_ERROR,
    AGREEMENT_SELECTED_ITEMS_CHANGE
} from '../actions';

export const unauthorizedAgreement = () => ({
    type: AGREEMENT_UNAUTHORIZED
});

export const getAgreementList = () => ({
    type: AGREEMENT_GET_LIST
});

export const getAgreementListSuccess = (items) => ({
    type: AGREEMENT_GET_LIST_SUCCESS,
    payload: items
});

export const getAgreementListError = (error) => ({
    type: AGREEMENT_GET_LIST_ERROR,
    payload: error
});

export const getAgreementListWithFilter = (column, value) => ({
    type: AGREEMENT_GET_LIST_WITH_FILTER,
    payload: { column, value }
});

export const getAgreementListWithOrder = (column) => ({
    type: AGREEMENT_GET_LIST_WITH_ORDER,
    payload: column
});

export const getAgreementListSearch = (keyword) => ({
    type: AGREEMENT_GET_LIST_SEARCH,
    payload: keyword
});

export const addAgreementItem = (item) => ({
    type: AGREEMENT_ADD_ITEM,
    payload: item
});

export const addAgreementItemSuccess = (items) => ({
    type: AGREEMENT_ADD_ITEM_SUCCESS,
    payload: items
});

export const addAgreementItemError = (error) => ({
    type: AGREEMENT_ADD_ITEM_ERROR,
    payload: error
});

export const deleteAgreementItem = (item) => ({
    type: AGREEMENT_DELETE_ITEM,
    payload: item
});

export const deleteAgreementItemSuccess = (items) => ({
    type: AGREEMENT_DELETE_ITEM_SUCCESS,
    payload: items
});

export const deleteAgreementItemError = (error) => ({
    type: AGREEMENT_DELETE_ITEM_ERROR,
    payload: error
});

export const searchAgreements = (keyword) => ({
    type: AGREEMENT_SEARCH,
    payload: keyword
});

export const searchAgreementsSuccess = (items) => ({
    type: AGREEMENT_SEARCH_SUCCESS,
    payload: items
});

export const searchAgreementsError = (error) => ({
    type: AGREEMENT_SEARCH_ERROR,
    payload: error
});

export const selectedAgreementItemsChange = (selectedItems) => ({
    type: AGREEMENT_SELECTED_ITEMS_CHANGE,
    payload: selectedItems
});