import ProductList from '../components/ProductList';
import ProductDetail from '../components/ProductDetail';

export const PRODUCT_LIST = 'PRODUCT_LIST';
export const PRODUCT_DETAIL = 'PRODUCT_DETAIL';

export function productListRoute(state) {
    return {
        route: {
            name: PRODUCT_LIST,
            component: ProductList,
        },
        routeData: {
            fetchProductsIfNeeded: state.fetchProductsIfNeeded,
            isFetching: state.isFetching,
            didInvalidate: state.didInvalidate,
            products: state.products,
            showProductPage: state.showProductPage,
        },
    };
}

export function productDetailRoute(state, product) {
    return {
        route: {
            name: PRODUCT_DETAIL,
            component: ProductDetail,
        },
        routeData: {
            product: product,
            onBack: state.onBack,
        },
    };
}
