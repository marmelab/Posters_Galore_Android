import 'isomorphic-fetch';
import assert from 'assert';
import nock from 'nock';
import * as actions from '../src/actions/PostersActions';
import mockStore from './mocks/Store';

const BASE_URL = 'http://postersgalore.marmelab.com';

describe('actions', () => {
    it('should create an action to notice an error', () => {
        assert.deepEqual(actions.errorHappened(), {
            type: actions.ERROR_HAPPENED,
        });
    });

    it('should create action for route change', () => {
        assert.deepEqual(actions.changeRoute('route'), {
            type: actions.CHANGE_ROUTE,
            route: 'route',
            routeData: {},
        });
    });

    it('should create action for route change with route data', () => {
        assert.deepEqual(actions.changeRoute('route', 'route data'), {
            type: actions.CHANGE_ROUTE,
            route: 'route',
            routeData: 'route data',
        });
    });

    describe('using REST API', () => {
        afterEach(() => {
            nock.cleanAll();
        });

        it('should request and receive list of products', (done) => {
            nock(BASE_URL)
                .get('/api/products')
                .reply(200, ['list of products']);

            const expectedActions = [
                {type: actions.REQUEST_PRODUCTS},
                {type: actions.RECEIVE_PRODUCTS, products: ['list of products']},
            ];

            const store = mockStore({routeData: {products: []}}, expectedActions, done);
            store.dispatch(actions.fetchProductsIfNeeded());
        });

        it('should not request list of products if already fetching', (done) => {
            const state = {
                routeData: {
                    isFetching: true,
                    products: ['a product'],
                },
            };

            const expectedActions = [
                {type: actions.REQUEST_PRODUCTS},
            ];

            const store = mockStore(state, expectedActions, done);
            const result = store.dispatch(actions.fetchProductsIfNeeded());
            assert.deepEqual(result, undefined);
        });

        it('should catch a request error and notice it', (done) => {
            nock(BASE_URL)
                .get('/api/products')
                .reply(404);

            const expectedActions = [
                {type: actions.REQUEST_PRODUCTS},
                {type: actions.ERROR_HAPPENED},
            ];

            const store = mockStore({routeData: {products: []}}, expectedActions, done);
            store.dispatch(actions.fetchProductsIfNeeded());
        });
    });
});
