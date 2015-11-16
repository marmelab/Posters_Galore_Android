/**
 * @see http://www.schibsted.pl/2015/10/testing-react-native-components-with-jest/
 */
const React = require('react/addons');
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

ReactNative.View = View;
ReactNative.Text = Text;
ReactNative.TouchableWithoutFeedback = View;

module.exports = ReactNative;
