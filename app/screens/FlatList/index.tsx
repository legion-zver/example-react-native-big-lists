import React from 'react';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {SafeAreaView, FlatList, Text, Dimensions} from 'react-native';
import {NavigationComponentProps, NavigationComponent, Navigation} from 'react-native-navigation';
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

class FlatListScreen extends NavigationComponent<Props> {
    componentDidMount() {
        this.fetchData(true);
    }

    fetchData = (reload: boolean = false) => {
        if (this.props.fetching) {
            return;
        }
        this.props.runGetTweets(reload);
    };

    keyExtractor = (id: string) => id;

    onEndReached = () => this.fetchData();

    onRefresh = () => this.fetchData(true);

    componentDidUpdate(prevProps: Props, prevState: any, snapshot?: any) {
        if (this.props.ids !== prevProps.ids) {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    title: {
                        color: 'rgba(25,25,25,1)',
                    },
                    subtitle: {
                        text: this.props.ids.length > 0 ? `${this.props.ids.length} tweets` : undefined,
                        color: 'rgba(25,25,25,0.62)',
                    },
                },
            });
        }
        if (this.props.net && !prevProps.net) {
            this.fetchData();
        }
    }

    renderItem = ({item: id}: any) => <TweetRow id={id} isRTL={true} />;

    renderTextLoader = () =>
        this.props.fetching || !this.props.net ? (
            <Text style={styles.loadingText}>
                {!this.props.net ? 'Ожидание интернет соединения...' : 'Загрузка...'}
            </Text>
        ) : null;

    render() {
        const {ids, emptyNextToken, fetching} = this.props;
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
                            onRefresh={this.onRefresh}
                            renderItem={this.renderItem}
                            removeClippedSubviews={true}
                            directionalLockEnabled={true}
                            keyExtractor={this.keyExtractor}
                            onEndReached={this.onEndReached}
                            refreshing={emptyNextToken && fetching}
                            ListFooterComponent={this.renderTextLoader()}
                        />
                    </Animatable.View>
                ) : (
                    this.renderTextLoader()
                )}
            </SafeAreaView>
        );
    }
}

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
