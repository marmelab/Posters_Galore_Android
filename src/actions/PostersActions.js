export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const ERROR_HAPPENED = 'ERROR_HAPPENED';

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
    const products = state.products;
    if (!products || products.length === 0) {
        return true;
    } else if (products.isFetching) {
        return false;
    }
    return products.didInvalidate;
}

export function fetchProductsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState())) {
            return dispatch(fetchProducts());
        }
    };
}
