import React, {
    Component,
    ListView, View,
    Image, Text,
} from 'react-native';

import style from '../styles/ProductStyle';

const PRODUCTS_URL = 'http://postersgalore.marmelab.com/api/products';

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
