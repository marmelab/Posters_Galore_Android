import assert from 'assert';
import sinon from 'sinon';
import React, { View } from 'react-native';
import utils from 'react-addons-test-utils';
import ProductDetail from '../../src/components/ProductDetail';

describe('component ProductDetail', () => {
    let productDetail;

    const product = {
        image: 'http://lorempixel.com/640/480/',
        reference: 'haut-haut-bas-bas-gauche-droite-gauche-droite-B-A',
        price: 42.24,
        width: 640,
        height: 480,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    const defaultProps = {
        product: product,
        onBack: sinon.spy(),
    };

    function renderProductDetail(props) {
        const renderer = utils.createRenderer();
        renderer.render(<ProductDetail {...props} />);
        const output = renderer.getRenderOutput();

        return {
            props,
            output,
            renderer,
        };
    }

    function findScrollView(output) {
        return output.props.children[1];
    }

    function findMainSection(output) {
        return findScrollView(output).props.children[0];
    }

    function findRightPane(output) {
        const mainSection = findMainSection(output);
        return mainSection.props.children[1];
    }

    beforeEach(() => {
        productDetail = renderProductDetail(defaultProps);
    });

    it('should render correctly', () => {
        const { output } = productDetail;
        assert.deepEqual(output.type, View);
    });

    it('should display good image', () => {
        const { output } = productDetail;
        const view = findMainSection(output);
        const image = view.props.children[0];

        assert.deepEqual(image.props.source.uri, product.image);
    });

    it('should display good reference', () => {
        const { output } = productDetail;
        const rightPane = findRightPane(output);
        const text = rightPane.props.children[0];

        assert.deepEqual(text.props.children[1], product.reference);
    });

    it('should display good price', () => {
        const { output } = productDetail;
        const paneElement = findRightPane(output).props.children[1];
        const text = paneElement.props.children[1];

        assert.deepEqual(text.props.children[0], product.price);
    });

    it('should display good width', () => {
        const { output } = productDetail;
        const paneElement = findRightPane(output).props.children[2];
        const text = paneElement.props.children[1];

        assert.deepEqual(text.props.children[0], product.width);
    });

    it('should display good height', () => {
        const { output } = productDetail;
        const paneElement = findRightPane(output).props.children[3];
        const text = paneElement.props.children[1];

        assert.deepEqual(text.props.children[0], product.height);
    });

    it('should display good description', () => {
        const { output } = productDetail;
        const text = findScrollView(output).props.children[2];

        assert.deepEqual(text.props.children, product.description);
    });
});
