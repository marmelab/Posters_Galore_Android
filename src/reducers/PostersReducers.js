import { combineReducers } from 'redux';
import * as actions from '../actions/PostersActions';
import { productListRoute } from '../routes/PostersRoutes';

const initialRoute = productListRoute({
    isFetching: true,
    didInvalidate: false,
    products: [],
});

export function route(state = initialRoute.route, action) {
    switch (action.type) {
    case actions.CHANGE_ROUTE:
        return Object.assign({}, state, {
            name: action.route.name,
            component: action.route.component,
        });
    default:
        return state;
    }
}

export function routeData(state = initialRoute.routeData, action) {
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
    case actions.CHANGE_ROUTE:
        return Object.assign({}, state, action.routeData);
    default:
        return state;
    }
}

const reducers = combineReducers({
    route,
    routeData,
});

export default reducers;
