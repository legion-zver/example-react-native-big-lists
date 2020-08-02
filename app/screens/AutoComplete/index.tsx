import React from 'react';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';

import ProductSearchInput from './components/ProductSearchInput';

import styles from './styles';

const AutoCompleteScreen: NavigationFunctionComponent<any> = () => (
    <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.content}>
                <ProductSearchInput />
            </View>
        </TouchableWithoutFeedback>
    </SafeAreaView>
);

export default AutoCompleteScreen;
