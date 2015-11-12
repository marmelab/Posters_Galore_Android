import { Component } from 'react-native';
import Render from './AppRender';

export default class PostersGaloreAndroid extends Component {
    render() {
        return Render.call(this, this.props, this.state);
    }
}
