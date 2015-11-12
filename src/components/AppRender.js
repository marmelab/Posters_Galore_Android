import React, { Text, View } from 'react-native';
import style from '../styles/MainStyle';

export default function() {
    return (
        <View style={style.container}>
            <Text style={style.welcome}>
                Welcome to React Native!
            </Text>
            <Text style={style.instructions}>
                To get started, edit index.android.js
            </Text>
            <Text style={style.instructions}>
                Shake or press menu button for dev menu
            </Text>
        </View>
    );
}
