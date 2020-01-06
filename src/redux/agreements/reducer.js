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
	AGREEMENT_SELECTED_ITEMS_CHANGE,
	AGREEMENT_SEARCH,
	AGREEMENT_SEARCH_SUCCESS,
	AGREEMENT_SEARCH_ERROR,
} from '../actions';

const INIT_STATE = {
	allAgreementItems: null,
	agreementItem: null,
	error: '',
	filter: null,
	searchKeyword: '',
	orderColumn: "numero",
	loading: false,
	searchBy: '',
	labels: [],
	orderColumns: [
		{ column: "numero", label: "Número" },
		{ column: "anio", label: "Año" },
	],
	categories: [],
	selectedItems: []
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case AGREEMENT_UNAUTHORIZED:
			return this.props.history.push('/');

		case AGREEMENT_GET_LIST:
			return { ...state, loading: false};

		case AGREEMENT_GET_LIST_SUCCESS:
			return { ...state, loading: true, allAgreementItems: action.payload.data, agreementItem: action.payload.data };

		case AGREEMENT_GET_LIST_ERROR:
			return { ...state, loading: true, error: action.payload };

		case AGREEMENT_GET_LIST_WITH_FILTER:
			if (action.payload.column === '' || action.payload.value === '') {
				return { ...state, loading: true, agreementItem: state.allAgreementItems, filter: null };
			} else {
				const filteredItems = state.allAgreementItems.filter((item) =>
					item[action.payload.column] === action.payload.value);
				return {
					...state, loading: true, agreementItem: filteredItems, filter: {
						column: action.payload.column,
						value: action.payload.value
					}
				}
			}

		case AGREEMENT_GET_LIST_WITH_ORDER:
			return { ...state, loading: true, searchBy: action.payload, orderColumn: state.orderColumns.find(x => x.column === action.payload) }

		case AGREEMENT_GET_LIST_SEARCH:
			if (action.payload === '') {
				return { ...state, agreementItem: state.allAgreementItems };
			} else {
				const keyword = action.payload.toLowerCase();
				const searchItems = state.allAgreementItems.filter((item) =>
					item.numero.toLowerCase().indexOf(keyword) > -1);
				return { ...state, loading: true, agreementItem: searchItems, searchKeyword: action.payload}
			}
		
		case AGREEMENT_ADD_ITEM:
			return { ...state, loading: false };

		case AGREEMENT_ADD_ITEM_SUCCESS:
			return { ...state, loading: true, allAgreementItems: action.payload, agreementItem: action.payload };

		case AGREEMENT_ADD_ITEM_ERROR:
			return { ...state, loading: true, error: action.payload };

		case AGREEMENT_DELETE_ITEM:
			return { ...state, loading: false };

		case AGREEMENT_DELETE_ITEM_SUCCESS:
			return { ...state, loading: true, allAgreementItems: action.payload, agreementItem: action.payload };

		case AGREEMENT_DELETE_ITEM_ERROR:
			return { ...state, loading: true, error: action.payload };
	
		case AGREEMENT_SEARCH:
			return { ...state, loading: false};
			
		case AGREEMENT_SEARCH_SUCCESS:
			return { ...state, loading: true, allAgreementItems: action.payload, agreementItem: action.payload };

		case AGREEMENT_SEARCH_ERROR:
			return { ...state, loading: true, error: action.payload };
	
		case AGREEMENT_SELECTED_ITEMS_CHANGE:
			return { ...state, loading: true, selectedItems: action.payload};

		default: return { ...state };
	}
}
