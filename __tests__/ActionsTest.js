jest.dontMock('../src/actions/PostersActions');

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

            const store = mockStore({ products: [] }, expectedActions, done);
            store.dispatch(actions.fetchProductsIfNeeded());
        });

        it('should catch a request error and notice it', (done) => {
            nock(BASE_URL)
                .get('/api/products')
                .reply(404);

            const expectedActions = [
                {type: actions.REQUEST_PRODUCTS},
                {type: actions.ERROR_HAPPENED},
            ];

            const store = mockStore({ products: [] }, expectedActions, done);
            store.dispatch(actions.fetchProductsIfNeeded());
        });
    });
});
