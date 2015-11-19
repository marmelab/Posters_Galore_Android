export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const ERROR_HAPPENED = 'ERROR_HAPPENED';
export const CHANGE_ROUTE = 'CHANGE_ROUTE';

const BASE_URL = 'http://postersgalore.marmelab.com/api';

export function errorHappened() {
    return {
        type: ERROR_HAPPENED,
    };
}

function requestProducts() {
    return {
        type: REQUEST_PRODUCTS,
    };
}

export function changeRoute(route, routeDatas = {}) {
    return {
        type: CHANGE_ROUTE,
        route,
        routeDatas,
    };
}

function receiveProducts(json) {
    return {
        type: RECEIVE_PRODUCTS,
        products: json,
    };
}

function fetchProducts() {
    return dispatch => {
        dispatch(requestProducts());
        return fetch(`${BASE_URL}/products`)
            .then(res => res.json())
            .then(json => dispatch(receiveProducts(json)))
            .catch(() => dispatch(errorHappened()));
    };
}

function shouldFetchPosts(state) {
    const routeDatas = state.routeDatas;
    const products = routeDatas.products;
    if (!products || products.length === 0) {
        return true;
    } else if (routeDatas.isFetching) {
        return false;
    }
    return routeDatas.didInvalidate;
}

export function fetchProductsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState())) {
            return dispatch(fetchProducts());
        }
    };
}
