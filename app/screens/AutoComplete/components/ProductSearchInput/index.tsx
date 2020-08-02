import {connect} from 'react-redux';
import {View, TextInput, ActivityIndicator, Image} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {State as ReduxState} from '../../../../reducers';
import {changeSearchQuery} from '../../../../actions';

import AutoCompleteMenu from './AutoCompleteMenu';

import styles, {placeholderTextColor} from './styles';

export interface Data {
    fetching: boolean;
    error: any;
}

export interface Props {
    value?: string;
    onChangeText?: (text: string) => void;
}

interface InnerProps extends Props, Data {
    changeSearchQuery: (query: string) => any;
}

function ProductSearchInput({value, error, fetching, changeSearchQuery, onChangeText}: InnerProps) {
    const [focused, setFocused] = useState(false),
        [selected, setSelected] = useState(false),
        // Only for example, but input value not use!
        [text, setText] = useState(value || ''),
        changeText = (text: string) => {
            setText(text);
            onChangeText && onChangeText(text);
        },
        onPressItem = useCallback((item: any) => {
            if (!item) {
                return;
            }
            changeText(item.name);
            setSelected(true);
        }, []),
        onPreChangeText = useCallback(
            (text: string) => {
                changeText(text);
                selected && setSelected(false);
                // INFO: Use redux saga and throttle effect, but we can use it lodash.throttle ;-)
                // Lodash example: lodash.throttle(() => runSearch(text.trim()), 1000);
                changeSearchQuery(text.trim());
            },
            [selected, onChangeText],
        );
    useEffect(() => {
        if (typeof value !== 'undefined' && value !== text && focused) {
            setText(value);
            changeSearchQuery(value.trim());
        }
    }, [value, focused]);
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputContainer,
                    focused ? styles.focusedContainer : styles.defaultContainer,
                    error ? styles.errorBorder : undefined,
                ]}>
                {fetching ? (
                    <View style={styles.loadingIndicator}>
                        <ActivityIndicator size="small" color={placeholderTextColor} />
                    </View>
                ) : (
                    <Image
                        resizeMode="contain"
                        style={styles.leftIcon}
                        source={require('../../../../assets/search-outline.png')}
                    />
                )}
                <TextInput
                    blurOnSubmit
                    value={text}
                    style={styles.input}
                    returnKeyType="search"
                    enablesReturnKeyAutomatically
                    onChangeText={onPreChangeText}
                    placeholder="Поиск по магазину"
                    clearButtonMode="while-editing"
                    underlineColorAndroid={'transparent'}
                    onBlur={() => setFocused(false)}
                    onFocus={() => setFocused(true)}
                    placeholderTextColor={placeholderTextColor}
                    onTouchEnd={() => selected && setSelected(false)}
                />
            </View>
            <View>
                {/* Remove 'query={text}' for up performance, if need it*/}
                <AutoCompleteMenu allow={!selected && focused} query={text} onPressItem={onPressItem} />
            </View>
        </View>
    );
}

// noinspection JSUnusedGlobalSymbols
export default connect(
    (state: ReduxState) => ({
        fetching: state.search.fetching,
        error: state.search.error,
    }),
    (dispatch: any) => ({
        changeSearchQuery: (query: string) => dispatch(changeSearchQuery(query)),
    }),
)(ProductSearchInput);
