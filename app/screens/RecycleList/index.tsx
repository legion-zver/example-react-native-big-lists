import React from 'react';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {SafeAreaView, Text, Dimensions, RefreshControl} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
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

interface State {
    dataProvider: DataProvider;
    layoutProvider: LayoutProvider;
}

class RecycleListScreen extends NavigationComponent<Props, State> {
    static getDerivedStateFromProps(props: Props, state: State) {
        if (state.dataProvider.getAllData() !== props.ids) {
            Navigation.mergeOptions(props.componentId, {
                topBar: {
                    title: {
                        color: 'rgba(25,25,25,1)',
                    },
                    subtitle: {
                        text: props.ids.length > 0 ? `${props.ids.length} tweets` : undefined,
                        color: 'rgba(25,25,25,0.62)',
                    },
                },
            });
            return {
                dataProvider: state.dataProvider.cloneWithRows(props.ids),
            };
        }
        return null;
    }
    layout = Dimensions.get('window');
    state: State = {
        dataProvider: new DataProvider(
            (r1, r2) => r1 !== r2,
            (index) => this.state.dataProvider.getDataForIndex(index),
        ),
        layoutProvider: new LayoutProvider(
            () => 0,
            (type, dim) => {
                dim.width = this.layout.width;
                dim.height = 96; // Start height
            },
        ),
    };

    fetchData = (reload: boolean = false) => {
        if (this.props.fetching) {
            return;
        }
        this.props.runGetTweets(reload);
    };

    onEndReached = () => this.fetchData();

    onRefresh = () => this.fetchData(true);

    componentDidMount() {
        this.fetchData(true);
    }

    componentDidUpdate(prevProps: Props, prevState: any, snapshot?: any) {
        if (this.props.net && !prevProps.net) {
            this.fetchData();
        }
    }

    rowRenderer = (type: string | number, id: string) => {
        return <TweetRow id={id} />;
    };

    renderTextLoader = () =>
        this.props.fetching || !this.props.net ? (
            <Text style={styles.loadingText}>
                {!this.props.net ? 'Ожидание интернет соединения...' : 'Загрузка...'}
            </Text>
        ) : null;

    render() {
        const count = this.state.dataProvider.getSize();
        this.layout = Dimensions.get('window');
        return (
            <SafeAreaView style={styles.container}>
                {count > 0 ? (
                    <Animatable.View useNativeDriver duration={600} animation="fadeInUp" style={styles.container}>
                        <RecyclerListView
                            style={styles.list}
                            canChangeSize={true}
                            scrollViewProps={{
                                directionalLockEnabled: true,
                                refreshControl: (
                                    <RefreshControl
                                        refreshing={this.props.emptyNextToken && this.props.fetching}
                                        onRefresh={this.onRefresh}
                                    />
                                ),
                                contentContainerStyle: {
                                    paddingVertical: 8,
                                },
                            }}
                            rowRenderer={this.rowRenderer}
                            onEndReached={this.onEndReached}
                            optimizeForInsertDeleteAnimations
                            renderFooter={this.renderTextLoader}
                            forceNonDeterministicRendering={true}
                            dataProvider={this.state.dataProvider}
                            layoutProvider={this.state.layoutProvider}
                            onEndReachedThreshold={this.layout.height * 1.6 /* 0.8 */}
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
)(RecycleListScreen);
