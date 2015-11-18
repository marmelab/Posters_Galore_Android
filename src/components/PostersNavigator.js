import React, {
    Component,
    PropTypes,
} from 'react-native';
import { connect } from 'react-redux/native';
import { changeRoute, fetchProductsIfNeeded } from '../actions/PostersActions';
import * as routes from '../routes/PostersRoutes';

export class PostersNavigator extends Component {
    showProductList() {
        const { route } = routes.productListRoute(this.props);
        this.props.changeRoute(route);
    }

    showProductDetail(productId) {
        const { route, routeDatas } = routes.productDetailRoute(this.props, productId);
        this.props.changeRoute(route, routeDatas);
    }

    bindActions(props) {
        const { route, routeDatas } = props;

        switch (route.name) {
        case routes.PRODUCT_LIST:
            routeDatas.fetchProductsIfNeeded = () => {
                this.props.fetchProductsIfNeeded();
            };
            routeDatas.showProductPage = (product) => {
                this.showProductDetail(product);
            };
            break;
        case routes.PRODUCT_DETAIL:
            routeDatas.onBack = () => {
                this.showProductList();
            };
            break;
        default:
            break;
        }

        return { route, routeDatas };
    }

    render() {
        const { route, routeDatas } = this.bindActions(this.props);

        return (
            <route.component {...routeDatas} />
        );
    }
}

PostersNavigator.propTypes = {
    route: PropTypes.object.isRequired,
    routeDatas: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    fetchProductsIfNeeded: PropTypes.func.isRequired,
};

export default connect((state) => state, {
    changeRoute,
    fetchProductsIfNeeded,
})(PostersNavigator);
