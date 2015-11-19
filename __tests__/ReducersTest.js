import assert from 'assert';
import reducers, {
    route as routeReducer,
    routeData as routeDataReducer,
} from '../src/reducers/PostersReducers';
import * as actions from '../src/actions/PostersActions';
import * as routes from '../src/routes/PostersRoutes';

describe('reducers', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            isFetching: true,
            didInvalidate: false,
            products: [],
        };
    });

    it('should return correct initial state', () => {
        assert.deepEqual(
            reducers(undefined, {}),
            routes.productListRoute(initialState)
        );
    });

    describe('route', () => {
        it('should return correct initial route', () => {
            const expectedRoute = routes.productListRoute({
                isFetching: true,
                didInvalidate: false,
                products: [],
            }).route;
            assert.deepEqual(routeReducer(undefined, {}), expectedRoute);
        });

        it('should handle change route event', () => {
            const action = {
                type: actions.CHANGE_ROUTE,
                route: {
                    name: 'route name',
                    component: 'route component',
                },
            };
            assert.deepEqual(routeReducer(undefined, action), {
                name: 'route name',
                component: 'route component',
            });
        });
    });

    describe('route data', () => {
        it('should return correct initial route data', () => {
            const expectedDatas = routes.productListRoute({
                isFetching: true,
                didInvalidate: false,
                products: [],
            }).routeData;
            assert.deepEqual(routeDataReducer(undefined, {}), expectedDatas);
        });

        it('should handle error happened event', () => {
            const action = actions.errorHappened();
            assert.deepEqual(routeDataReducer({}, action), {
                didInvalidate: true,
            });
        });

        it('should handle request products event', () => {
            const action = {type: actions.REQUEST_PRODUCTS};
            assert.deepEqual(routeDataReducer({}, action), {
                didInvalidate: false,
                isFetching: true,
            });
        });

        it('should handle receive products event', () => {
            const action = {
                type: actions.RECEIVE_PRODUCTS,
                products: ['some cool products'],
            };
            assert.deepEqual(routeDataReducer({}, action), {
                didInvalidate: false,
                isFetching: false,
                products: ['some cool products'],
            });
        });

        it('should handle change route event', () => {
            const action = {
                type: actions.CHANGE_ROUTE,
                routeData: {some: 'data'},
            };
            assert.deepEqual(routeDataReducer({}, action), {
                some: 'data',
            });
        });
    });
});
