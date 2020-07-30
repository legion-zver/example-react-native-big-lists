import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {SafeAreaView, FlatList, Text} from 'react-native';
import {NavigationComponentProps, NavigationFunctionComponent, Navigation} from 'react-native-navigation';
import {State as ReduxState} from '../../reducers';
import {runGetTweets} from '../../actions';
import {TweetRow} from '../../components';

import styles from './styles';

interface Props extends NavigationComponentProps {
    runGetTweets: (reload: boolean) => void;
    emptyNextToken: boolean;
    fetching: boolean;
    net: boolean;
    ids: any[];
}

const TextLoader = ({fetching, net}: any) =>
    fetching || !net ? (
        <Text style={styles.loadingText}>{!net ? 'Ожидание интернет соединения...' : 'Загрузка...'}</Text>
    ) : null;

const FlatListScreen: NavigationFunctionComponent<Props> = ({
    net,
    ids,
    fetching,
    componentId,
    runGetTweets,
    emptyNextToken,
}: Props) => {
    useEffect(() => {
        Navigation.mergeOptions(componentId, {
            topBar: {
                title: {
                    color: 'rgba(25,25,25,1)',
                },
                subtitle: {
                    text: ids.length > 0 ? `${ids.length} tweets` : undefined,
                    color: 'rgba(25,25,25,0.62)',
                },
            },
        });
    }, [ids]);
    useEffect(() => {
        if (net) {
            runGetTweets(ids.length < 1);
        }
    }, [net]);
    return (
        <SafeAreaView style={styles.container}>
            {ids.length > 0 ? (
                <Animatable.View useNativeDriver duration={600} animation="fadeInUp" style={styles.container}>
                    <FlatList
                        data={ids}
                        style={styles.list}
                        contentContainerStyle={{
                            paddingVertical: 8,
                        }}
                        onEndReachedThreshold={2}
                        removeClippedSubviews={true}
                        directionalLockEnabled={true}
                        keyExtractor={(id: string) => id}
                        onRefresh={() => runGetTweets(true)}
                        refreshing={emptyNextToken && fetching}
                        onEndReached={() => !fetching && runGetTweets(false)}
                        ListFooterComponent={<TextLoader fetching={fetching} net={net} />}
                        renderItem={({item: id}: any) => <TweetRow id={id} isRTL={true} />}
                    />
                </Animatable.View>
            ) : (
                <TextLoader fetching={fetching} net={net} />
            )}
        </SafeAreaView>
    );
};

export default connect(
    (state: ReduxState) => ({
        emptyNextToken: !state.tweets.nextToken,
        fetching: state.tweets.fetching,
        ids: state.tweets.ids,
        net: state.net,
    }),
    (dispatch) => ({
        runGetTweets: (reload: boolean) => dispatch(runGetTweets(reload)),
    }),
)(FlatListScreen);
