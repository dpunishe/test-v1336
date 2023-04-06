
import { combineReducers } from 'redux';

import { Data } from '../components/ListComponent'

const SET_LIST_DATA_DEFAULT = 'SET_LIST_DATA_DEFAULT';
const SET_LIST_DATA_UI = 'SET_LIST_DATA_UI';

export interface ListDataState {
  listDataDefault: Data[],
  listDataUi: Data[],
  filterByDepID: string | null,
  filterByConnection: string | null,
  loading: boolean,
  error: any,
}

const initialBrigadesState: ListDataState = {
  listDataDefault: [],
  listDataUi: [],
  error: null,
  loading: false,
  filterByConnection: localStorage.getItem('byConnection') ? localStorage.getItem('byConnection') : 'all',
  filterByDepID: localStorage.getItem('byDepID') ? localStorage.getItem('byDepID') : 'all',
};

interface IListDataDefault {
  type: 'SET_LIST_DATA_DEFAULT';
  payload: Data[];
}

interface IListDataUi {
  type: 'SET_LIST_DATA_UI';
  payload: Data[];
}

interface ISelect {
  type: 'FILTER_ITEMS_BY_DEPARTMENT';
  payload: string;
}

export function brigadesReducer(state = initialBrigadesState, action: IListDataUi | IListDataDefault | ISelect) {
  switch (action.type) {
    case SET_LIST_DATA_DEFAULT:
      return {
        ...state,
        listDataDefault: action.payload,
      };

    case SET_LIST_DATA_UI:
      return {
        ...state,
        listDataUi: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  brigades: brigadesReducer,
});

export  {rootReducer};

export const setListDataDefault = (data: Data[]) => ({ type: SET_LIST_DATA_DEFAULT, payload: data });
export const setListDataUi = (data: Data[]) => ({ type: SET_LIST_DATA_UI, payload: data });