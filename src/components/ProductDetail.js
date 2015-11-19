import React, {
    PropTypes,
    StyleSheet,
    PixelRatio,
    ToolbarAndroid, TouchableOpacity,
    ScrollView, View,
    Text, Image,
} from 'react-native';

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
    },
    toolbar: {
        backgroundColor: '#a9a9a9',
        height: 56,
    },
    mainSection: {
        flexDirection: 'row',
    },
    detailsImage: {
        width: 134,
        height: 200,
        backgroundColor: '#eaeaea',
        marginRight: 10,
    },
    rightPane: {
        justifyContent: 'space-between',
        flex: 1,
    },
    productReference: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    small: {
        fontSize: 12,
    },
    pane: {
        marginTop: 10,
    },
    paneTitle: {
        fontSize: 14,
    },
    paneStrongValue: {
        fontSize: 28,
        fontWeight: '500',
        color: 'green',
    },
    separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginVertical: 10,
    },
});

class ProductDetail extends React.Component {
    render() {
        const product = this.props.product;

        return (
            <View>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={this.props.onBack}>
                        <ToolbarAndroid
                            actions={[]}
                            style={styles.toolbar}
                            titleColor="white"
                            title={`Back`}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.mainSection}>
                        <Image
                            source={{uri: product.image}}
                            style={styles.detailsImage}
                        />
                        <View style={styles.rightPane}>
                            <Text style={styles.productReference}>
                                Ref: {product.reference}
                            </Text>
                            <View style={styles.pane}>
                                <Text style={styles.paneTitle}>Price</Text>
                                <Text style={styles.paneStrongValue}>
                                    {product.price} $
                                </Text>
                            </View>
                            <View style={styles.pane}>
                                <Text style={styles.paneTitle}>Width</Text>
                                <Text>
                                    {product.width} in
                                </Text>
                            </View>
                            <View style={styles.pane}>
                                <Text style={styles.paneTitle}>Height</Text>
                                <Text>
                                    {product.height} in
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <Text>
                        {product.description}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default ProductDetail;
