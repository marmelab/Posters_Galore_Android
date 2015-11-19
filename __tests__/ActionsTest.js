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
            routeDatas: {},
        });
    });

    it('should create action for route change with route datas', () => {
        assert.deepEqual(actions.changeRoute('route', 'route datas'), {
            type: actions.CHANGE_ROUTE,
            route: 'route',
            routeDatas: 'route datas',
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

            const store = mockStore({routeDatas: {products: []}}, expectedActions, done);
            store.dispatch(actions.fetchProductsIfNeeded());
        });

        it('should not request list of products if already fetching', (done) => {
            const state = {
                routeDatas: {
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

            const store = mockStore({routeDatas: {products: []}}, expectedActions, done);
            store.dispatch(actions.fetchProductsIfNeeded());
        });
    });
});
