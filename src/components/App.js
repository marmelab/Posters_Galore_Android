import React, { Component } from 'react-native';
import { Provider } from 'react-redux/native';
import configureStore from '../store/PostersStore';
import ProductList from './ProductList';

const store = configureStore();

export default class PostersGaloreAndroid extends Component {
    render() {
        return (
            <Provider store={store}>
                <ProductList />
            </Provider>
        );
    }
}
