import React, {
    Component, PropTypes,
    ScrollView, View,
    Image, Text,
    StyleSheet,
    PixelRatio,
    TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
    },
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
        width: 60,
        height: 93,
        backgroundColor: '#dddddd',
        marginRight: 10,
    },
    price: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    stock: {
        color: '#999999',
        fontSize: 12,
    },
    separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginVertical: 10,
    },
});

export class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProductsIfNeeded();
    }

    _onPressProduct(product) {
        return () => {
            this.props.showProductPage(product);
        };
    }

    renderProducts(products) {
        return (
            <ScrollView style={styles.contentContainer}>
                {products.map((product) =>
                    <View key={product.id}>
                        <TouchableOpacity
                            onPress={this._onPressProduct(product)}>
                            <View style={styles.container}>
                                <Image
                                    style={styles.thumbnail}
                                    source={{uri: product.thumbnail}}
                                />
                                <View style={styles.rightContainer}>
                                    <Text style={styles.price}>
                                        Buy for {product.price}$
                                    </Text>
                                    <Text style={styles.stock}>
                                        {product.stock} in stock
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.separator} />
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
    showProductPage: PropTypes.func.isRequired,
};

export default ProductList;
