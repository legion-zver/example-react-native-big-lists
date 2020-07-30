import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 0.65,
        borderBottomColor: 'rgba(0,0,0,0.15)',
    },
    userInfo: {
        flexWrap: 'wrap',
        direction: 'ltr',
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
    },
    info: {
        flex: 1,
        direction: 'ltr',
        flexDirection: 'column',
    },
    metrics: {
        direction: 'ltr',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingTop: 2,
    },
    userName: {
        fontSize: 14,
        color: '#00abee',
        fontWeight: 'bold',
        marginRight: 4,
    },
    userAlias: {
        fontSize: 12,
    },
    text: {
        paddingVertical: 2,
        fontStyle: 'normal',
        fontSize: 14,
    },
    date: {
        fontWeight: '500',
        marginTop: 8,
        opacity: 0.62,
        fontSize: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        marginRight: 16,
        borderRadius: 16,
    },
    metricItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 8,
    },
    metricIcon: {
        width: 16,
        height: 16,
        marginRight: 2,
        tintColor: '#146586',
    },
    metricValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#146586',
    },
});
