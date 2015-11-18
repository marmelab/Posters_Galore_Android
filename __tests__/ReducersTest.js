// import assert from 'assert';
// import reducer from '../src/reducers/PostersReducers';
// import {
//     ERROR_HAPPENED,
//     REQUEST_PRODUCTS,
//     RECEIVE_PRODUCTS,
// } from '../src/actions/PostersActions';
//
// describe('reducers', () => {
//     it('should return initial state', () => {
//         assert.deepEqual(reducer(undefined, {}), {
//             isFetching: true,
//             didInvalidate: false,
//             products: [],
//         });
//     });
//
//     it('should handle ERROR_HAPPENED', () => {
//         assert.deepEqual(reducer({}, {type: ERROR_HAPPENED}), {
//             didInvalidate: true,
//         });
//     });
//
//     it('should handle REQUEST_PRODUCTS', () => {
//         assert.deepEqual(reducer({}, {type: REQUEST_PRODUCTS}), {
//             didInvalidate: false,
//             isFetching: true,
//         });
//     });
//
//     it('should handle RECEIVE_PRODUCTS', () => {
//         const result = reducer({}, {
//             type: RECEIVE_PRODUCTS,
//             products: ['some products'],
//         });
//
//         assert.deepEqual(result, {
//             didInvalidate: false,
//             isFetching: false,
//             products: ['some products'],
//         });
//     });
// });
