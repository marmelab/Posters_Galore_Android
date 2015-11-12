import React, {
    Component,
    ListView, View,
    Image, Text,
    StyleSheet,
} from 'react-native';

const PRODUCTS_URL = 'http://postersgalore.marmelab.com/api/products';

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

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (raw1, raw2) => raw1 !== raw2,
            }),
            loaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(PRODUCTS_URL)
            .then((res) => res.json())
            .then((resData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(resData),
                    loaded: true,
                });
            })
            .done();
    }

    renderProduct(product) {
        return (
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
        );
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View><Text>Loading ...</Text></View>
            );
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderProduct}
            />
        );
    }
}
