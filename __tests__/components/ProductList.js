import sinon from 'sinon';
import assert from 'assert';
import React from 'react';
import utils from 'react-addons-test-utils';
import { ProductList } from '../../src/components/ProductList';

describe('component ProductList', () => {
    let props;
    let productList;

    function renderProductList() {
        const renderer = utils.createRenderer();
        renderer.render(<ProductList {...props} />);
        const output = renderer.getRenderOutput();

        productList = {
            props,
            output,
            renderer,
        };
    }

    beforeEach(() => {
        props = {
            products: [],
            isFetching: false,
            didInvalidate: false,
            fetchProductsIfNeeded: sinon.spy(),
        };

        renderProductList();
    });

    it('should render correctly if no products', () => {
        const { output } = productList;
        const text = output.props.children;
        assert.deepEqual(text.props.children, 'No product available.');
    });

    it('should render products correctly', () => {
        props.products = [{
            thumbnail: 'some url',
            price: 'THE PRICE',
            stock: 'THE STOCK',
        }];
        renderProductList();

        const { output } = productList;
        assert.deepEqual(
            output.props.children.length, 1,
            'Not the good amount of rendered products'
        );

        const [ view ] = output.props.children;
        const [ image, textView ] = view.props.children;
        assert.deepEqual(image.props.source.uri, 'some url');

        const [ price, stock ] = textView.props.children;
        assert.notEqual(price.props.children.indexOf('THE PRICE'), -1,
                        'The price is not correctly rendered');
        assert.notEqual(stock.props.children.indexOf('THE STOCK'), -1,
                        'The stock is not correctly rendered');
    });
});
