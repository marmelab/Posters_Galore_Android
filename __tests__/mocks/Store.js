import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import assert from 'assert';

const middlewares = [thunk];

/**
 * Mocked Store
 * @see http://rackt.org/redux/docs/recipes/WritingTests.html
 */
export default function mockStore(state, expectedActions, done) {
    if (!Array.isArray(expectedActions)) {
        throw new Error('expectedActions should be an array of expected actions.');
    }
    if (typeof done !== 'undefined' && typeof done !== 'function') {
        throw new Error('done should either be undefined or function.');
    }

    function mockStoreWithoutMiddleware() {
        return {
            getState() {
                return typeof state === 'function' ? state() : state;
            },

            dispatch(action) {
                const expectedAction = expectedActions.shift();

                try {
                    assert.deepEqual(action, expectedAction);
                    if (done && !expectedActions.length) {
                        done();
                    }
                    return action;
                } catch (e) {
                    done(e);
                }
            },
        };
    }

    const mockStoreWithMiddleware = applyMiddleware(
        ...middlewares
    )(mockStoreWithoutMiddleware);

    return mockStoreWithMiddleware();
}
