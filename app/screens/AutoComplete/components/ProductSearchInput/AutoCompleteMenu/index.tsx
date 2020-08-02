import React from 'react';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {Text, FlatList, TouchableHighlight} from 'react-native';

import {State as ReduxState} from '../../../../../reducers';

import styles, {menuItemHeight} from '../styles';

export interface Props {
    onPressItem?: (item: any) => any;
    allow?: boolean;
    query?: string; // only for change pattern selection in real time
}

interface InnerProps extends Props {
    query: string;
    items: any[];
}

function _menuKeyExtractor(item: any): any {
    return `${item?.id}`;
}

function _getMenuItemLayout(item: any, index: number): any {
    return {length: menuItemHeight, offset: menuItemHeight * index, index};
}

function _parseText(regexp: RegExp, text: string): any[] {
    let matches: RegExpExecArray | null = null,
        currentMatches = 0,
        parts: any[] = [],
        textLeft = text;
    while (textLeft && (matches = regexp.exec(textLeft))) {
        parts.push(...[{text: textLeft.substr(0, matches.index)}, {text: matches[0], _matched: true}]);
        textLeft = textLeft.substr(matches.index + matches[0].length);
        // Only 2 constrains! for optimization
        if (++currentMatches > 2) {
            break;
        }
    }
    parts.push({text: textLeft});
    return parts;
}

function MenuItem({item, regexp, onPress}: any) {
    const text: string = item?.name || '';
    if (text.length < 1) {
        return null;
    }
    return (
        <TouchableHighlight
            activeOpacity={0.72}
            style={styles.menuItem}
            underlayColor="rgba(0,0,0,0.1)"
            onPress={() => onPress && onPress(item)}>
            <Text style={styles.menuItemText} numberOfLines={2}>
                {_parseText(regexp, text).map((part: any, index: number) => (
                    <Text key={`p.${index}`} style={part._matched ? styles.menuItemCoincidence : undefined}>
                        {part.text}
                    </Text>
                ))}
            </Text>
        </TouchableHighlight>
    );
}

function AutoCompleteMenu({allow, query, items, onPressItem}: InnerProps) {
    if (!allow || query.length < 1 || items.length < 1) {
        return null;
    }
    const regexp = new RegExp(`(${query.trim().toLowerCase()})`, 'ig');
    return (
        <Animatable.View duration={334} useNativeDriver animation="fadeIn" style={styles.menu}>
            <FlatList
                data={items}
                directionalLockEnabled
                keyboardDismissMode="none"
                bounces={items.length > 4}
                keyExtractor={_menuKeyExtractor}
                getItemLayout={_getMenuItemLayout}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingVertical: 8}}
                renderItem={({item}: any) => <MenuItem regexp={regexp} item={item} onPress={onPressItem} />}
            />
        </Animatable.View>
    );
}

export default connect((state: ReduxState, props: Props) => ({
    items: state.search.items,
    query: props.query || state.search.query,
}))(AutoCompleteMenu);
