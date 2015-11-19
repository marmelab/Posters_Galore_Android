/* eslint-disable */
/**
 * @see http://www.schibsted.pl/2015/10/testing-react-native-components-with-jest/
 */
import React from 'react';
const ReactNative = React;

ReactNative.StyleSheet = {
    create: function create(styles) {
        return styles;
    },
};

class View extends React.Component {
    render() { return false; }
}
class Text extends React.Component {
    render() { return false; }
}
class PixelRatio extends React.Component {
    static get() { return 1; }
}

ReactNative.View = View;
ReactNative.Text = Text;
ReactNative.PixelRatio = PixelRatio;
ReactNative.TouchableWithoutFeedback = View;

module.exports = ReactNative;
