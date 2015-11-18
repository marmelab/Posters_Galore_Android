import React, {
    Component, PropTypes,
    ScrollView, View,
    Image, Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

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

    _onPressProduct(productId) {
        return () => {
            this.props.showProductPage(productId);
        };
    }

    renderProducts(products) {
        return (
            <ScrollView>
                {products.map((product) =>
                    <TouchableOpacity
                        key={product.id}
                        onPress={this._onPressProduct(product.id)}>
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
                    </TouchableOpacity>
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
    showProductPage: PropTypes.func.isRequired,
};

export default ProductList;
