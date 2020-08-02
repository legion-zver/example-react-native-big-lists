import createSagaMiddleware from 'redux-saga';
import {Navigation} from 'react-native-navigation';
import {Store, createStore, applyMiddleware} from 'redux';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';

import {AUTO_COMPLETE_SCREEN, FLAT_LIST_SCREEN, RECYCLE_LIST_VIEW_SCREEN} from './constants';
import {changeNetStatus} from './actions';
import {registerScreens} from './screens';
import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);

registerScreens(store);

export function start() {
    NetInfo.configure({
        reachabilityUrl: 'https://clients3.google.com/generate_204',
        reachabilityTest: async (response) => response.status === 204,
        reachabilityLongTimeout: 60 * 1000,
        reachabilityShortTimeout: 5 * 1000,
        reachabilityRequestTimeout: 15 * 1000,
    });
    NetInfo.addEventListener((state: NetInfoState) => {
        const online = state.isConnected || state.isInternetReachable;
        if (store.getState().net === online) {
            return;
        }
        store.dispatch(changeNetStatus(online));
    });
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    children: [
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: RECYCLE_LIST_VIEW_SCREEN,
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: 'RecycleListView',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                        icon: require('./assets/list-outline.png'),
                                        selectedIconColor: '#0062d9',
                                        text: 'RecycleListView',
                                    },
                                },
                            },
                        },
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: FLAT_LIST_SCREEN,
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: 'FlatList',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                        icon: require('./assets/list-outline.png'),
                                        selectedIconColor: '#0062d9',
                                        text: 'FlatList',
                                    },
                                },
                            },
                        },
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: AUTO_COMPLETE_SCREEN,
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: 'Search products',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                        icon: require('./assets/search-outline.png'),
                                        selectedIconColor: '#0062d9',
                                        text: 'Search',
                                    },
                                },
                            },
                        },
                    ],
                    options: {
                        bottomTabs: {
                            titleDisplayMode: 'alwaysShow',
                        },
                    },
                },
            },
        }).catch((error) => {
            console.warn("Can't set root navigation", error);
        });
    });
}
