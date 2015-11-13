import { combineReducers } from 'redux';
import * as actions from '../actions/PostersActions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    products: [],
};

export default function products(state = initialState, action) {
    switch (action.type) {
    case actions.ERROR_HAPPENED:
        return Object.assign({}, state, {
            didInvalidate: true,
        });
    case actions.REQUEST_PRODUCTS:
        return Object.assign({}, state, {
            didInvalidate: false,
            isFetching: true,
        });
    case actions.RECEIVE_PRODUCTS:
        return Object.assign({}, state, {
            didInvalidate: false,
            isFetching: false,
            products: action.products,
        });
    default:
        return state;
    }
}
