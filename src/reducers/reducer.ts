
import { combineReducers } from 'redux';

const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
const GET_ITEMS_FAIL = 'GET_ITEMS_FAIL';
const FILTER_ITEMS_BY_CONNECTION = 'FILTER_ITEMS_BY_CONNECTION';
const FILTER_ITEMS_BY_DEPARTMENT = 'FILTER_ITEMS_BY_DEPARTMENT';

const initialBrigadesState = {
  items: [],
  error: null,
  loading: false,
  filterByConnection: localStorage.getItem('byConnection') ? localStorage.getItem('byConnection') : 'all',
  filterByDepID: localStorage.getItem('byDepID') ? localStorage.getItem('byDepID') : 'all',
};

function brigadesReducer(state = initialBrigadesState, action: { type: any; payload: string; }) {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null,
      };
    case GET_ITEMS_FAIL:
      return {
        ...state,
        items: [],
        loading: false,
        error: action.payload,
      };
    case FILTER_ITEMS_BY_CONNECTION:
      localStorage.setItem('connectionStateId', action.payload);
      return {
        ...state,
        filterByConnection: action.payload,
      };
    case FILTER_ITEMS_BY_DEPARTMENT:
      localStorage.setItem('byDepID', action.payload);
      return {
        ...state,
        filterByDepID: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  brigades: brigadesReducer,
});

export  {rootReducer};

export const filterItemsByConnection = (state: number | null) => ({ type: FILTER_ITEMS_BY_CONNECTION, payload: state });
export const filterItemsByDepartment = (depId: number | null) => ({ type: FILTER_ITEMS_BY_DEPARTMENT, payload: depId });