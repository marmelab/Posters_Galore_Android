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

        const { route, routeDatas } = this.bindActions(this.props);
        this.route = route;
        this.routeDatas = routeDatas;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props || !this.navigator) {
            return;
        }

        const { route, routeDatas } = this.bindActions(nextProps);

        if (this.route !== route) {
            this.route = route;
            this.routeDatas = routeDatas;
            this.navigator.push(route);
            return;
        }

        if (this.routeDatas !== routeDatas) {
            this.routeDatas = routeDatas;
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
            if (!this.navigator) {
                routeDatas.onBack = () => {
                    this.showProductList();
                };
            } else {
                routeDatas.onBack = () => {
                    this.navigator.pop();
                };
            }
            break;
        default:
            break;
        }

        return { route, routeDatas };
    }

    renderScene(route, navigator) {
        if (!this.navigator) {
            this.navigator = navigator;
        }

        const { routeDatas } = this;

        return (
            <route.component {...routeDatas} />
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
    routeDatas: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    fetchProductsIfNeeded: PropTypes.func.isRequired,
};

export default connect((state) => state, {
    changeRoute,
    fetchProductsIfNeeded,
})(PostersNavigator);
