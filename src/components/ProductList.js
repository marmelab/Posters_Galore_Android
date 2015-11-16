import React, {
    Component, PropTypes,
    ScrollView, View,
    Image, Text,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux/native';
import { fetchProductsIfNeeded } from '../actions/PostersActions';

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
});

export class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProductsIfNeeded();
    }

    renderProducts(products) {
        return (
            <ScrollView>
                {products.map((product) =>
                    <View style={style.container}>
                        <Image
                            style={style.thumbnail}
                            source={{uri: product.thumbnail}}
                        />
                        <View style={style.rightContainer}>
                            <Text>Buy for {product.price}$</Text>
                            <Text>{product.stock} in stock</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        );
    }

    renderMessage(message) {
        return (
            <View>
                <Text>{message}</Text>
            </View>
        );
    }

    render() {
        const { isFetching, didInvalidate, products } = this.props;

        if (didInvalidate) {
            return this.renderMessage('An error occured.');
        }

        if (isFetching && products.length === 0) {
            return this.renderMessage('Loading ...');
        }

        if (!isFetching && products.length === 0) {
            return this.renderMessage('No product available.');
        }

        return this.renderProducts(products);
    }
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    fetchProductsIfNeeded: PropTypes.func.isRequired,
};

export default connect((state) => state, { fetchProductsIfNeeded })(ProductList);
