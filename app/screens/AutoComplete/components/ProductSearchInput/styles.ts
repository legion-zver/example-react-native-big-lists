import {StyleSheet} from 'react-native';

import {elevationStyle} from '../../../../utils';

export const placeholderTextColor = '#949494';

export const menuItemHeight = 48;

function getBorderStyle(borderWidth: number, borderColor: string): any {
    return {
        borderWidth,
        borderColor,
        paddingVertical: 6 - borderWidth,
        paddingHorizontal: 8 - borderWidth,
    };
}

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    inputContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 6,
    },
    focusedContainer: {
        backgroundColor: '#FFF',
        ...getBorderStyle(2, '#417CEE'),
    },
    defaultContainer: {
        backgroundColor: '#FAFAFA',
        ...getBorderStyle(0.65, '#DFDFDF'),
    },
    errorBorder: {
        borderColor: 'red',
    },
    loadingIndicator: {
        width: 20,
        height: 20,
        marginRight: 6,
        alignItems: 'center',
    },
    leftIcon: {
        width: 20,
        height: 20,
        marginRight: 6,
        tintColor: placeholderTextColor,
    },
    input: {
        flex: 1,
        color: '#000',
        fontSize: 14,
        minHeight: 28,
    },
    menu: {
        top: 4,
        left: 0,
        right: 0,
        borderRadius: 6,
        position: 'absolute',
        backgroundColor: '#fff',
        minHeight: menuItemHeight + 16,
        maxHeight: menuItemHeight * 4 + 16,
        ...elevationStyle(4),
    },
    menuItem: {
        paddingHorizontal: 16,
        height: menuItemHeight,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    menuItemText: {
        flex: 1,
        fontSize: 14,
        color: '#757575',
        fontWeight: 'normal',
    },
    menuItemCoincidence: {
        fontWeight: 'bold',
        color: '#000',
    },
});
