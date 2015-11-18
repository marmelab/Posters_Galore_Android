import React, {
    Component,
    PropTypes,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

class ProductDetail extends Component {
    render() {
        return (
            <View>
                <Text>Show product #{this.props.id}</Text>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

ProductDetail.propTypes = {
    id: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default ProductDetail;
