import sinon from 'sinon';
import assert from 'assert';
import React from 'react';
import utils from 'react-addons-test-utils';
import ProductList from '../../src/components/ProductList';

describe('component ProductList', () => {
    let productList;

    const defaultProps = {
        products: [],
        isFetching: false,
        didInvalidate: false,
        fetchProductsIfNeeded: sinon.spy(),
        showProductPage: sinon.spy(),
    };

    function renderProductList(props) {
        const renderer = utils.createRenderer();
        renderer.render(<ProductList {...props} />);
        const output = renderer.getRenderOutput();

        return {
            props,
            output,
            renderer,
        };
    }

    beforeEach(() => {
        productList = renderProductList(defaultProps);
    });

    it('should render correctly if no products', () => {
        const { output } = productList;
        const text = output.props.children;
        assert.deepEqual(text.props.children, 'No product available.');
    });

    it('should render products correctly', () => {
        const props = Object.assign({}, defaultProps, {
            products: [{
                id: 42,
                thumbnail: 'some url',
                price: 'THE PRICE',
                stock: 'THE STOCK',
            }],
        });
        productList = renderProductList(props);

        const { output } = productList;
        assert.deepEqual(
            output.props.children.length, 1,
            'Not the good amount of rendered products'
        );

        const rootView = output.props.children[0];
        const touchable = rootView.props.children[0];
        const view = touchable.props.children;
        const [ image, textView ] = view.props.children;
        assert.deepEqual(image.props.source.uri, 'some url');

        const [ price, stock ] = textView.props.children;
        assert.notEqual(
            price.props.children.indexOf('THE PRICE'),
            -1,
            'The price is not correctly rendered'
        );
        assert.notEqual(
            stock.props.children.indexOf('THE STOCK'),
            -1,
            'The stock is not correctly rendered'
        );
    });
});
