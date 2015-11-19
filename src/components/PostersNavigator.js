import React, {
    Component,
    PropTypes,
    Navigator,
    BackAndroid,
} from 'react-native';
import { connect } from 'react-redux/native';
import { changeRoute, fetchProductsIfNeeded } from '../actions/PostersActions';
import * as routes from '../routes/PostersRoutes';

export class PostersNavigator extends Component {
    constructor(props) {
        super(props);
        this.bindEventListnener();

        const { route, routeData } = this.bindActions(this.props);
        this.route = route;
        this.routeData = routeData;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props || !this.navigator) {
            return;
        }

        const { route, routeData } = this.bindActions(nextProps);

        if (this.route !== route) {
            this.route = route;
            this.routeData = routeData;
            this.navigator.push(route);
            return;
        }

        if (this.routeData !== routeData) {
            this.routeData = routeData;
            this.navigator.replace(this.route);
        }
    }

    bindEventListnener() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (!this.navigator) {
                return false;
            }

            if (this.route.name === routes.PRODUCT_LIST) {
                return false;
            }

            this.navigator.pop();
            return true;
        });
    }

    showProductList() {
        const { route } = routes.productListRoute(this.props);
        this.props.changeRoute(route);
    }

    showProductDetail(productId) {
        const { route, routeData } = routes.productDetailRoute(this.props, productId);
        this.props.changeRoute(route, routeData);
    }

    bindActions(props) {
        const { route, routeData } = props;

        switch (route.name) {
        case routes.PRODUCT_LIST:
            routeData.fetchProductsIfNeeded = () => {
                this.props.fetchProductsIfNeeded();
            };
            routeData.showProductPage = (product) => {
                this.showProductDetail(product);
            };
            break;
        case routes.PRODUCT_DETAIL:
            if (!this.navigator) {
                routeData.onBack = () => {
                    this.showProductList();
                };
            } else {
                routeData.onBack = () => {
                    this.navigator.pop();
                };
            }
            break;
        default:
            break;
        }

        return { route, routeData };
    }

    renderScene(route, navigator) {
        if (!this.navigator) {
            this.navigator = navigator;
        }

        const { routeData } = this;

        return (
            <route.component {...routeData} />
        );
    }

    render() {
        const { route } = this;

        return (
            <Navigator
                initialRoute={route}
                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }
}

PostersNavigator.propTypes = {
    route: PropTypes.object.isRequired,
    routeData: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    fetchProductsIfNeeded: PropTypes.func.isRequired,
};

export default connect((state) => state, {
    changeRoute,
    fetchProductsIfNeeded,
})(PostersNavigator);
