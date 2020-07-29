import createSagaMiddleware from 'redux-saga';
import {Navigation} from 'react-native-navigation';
import {Store, createStore, applyMiddleware} from 'redux';
import {FLAT_LIST_SCREEN, RECYCLE_LIST_VIEW_SCREEN} from './constants';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';

import {registerScreens} from './screens';
import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);

registerScreens(store);

export function start() {
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
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                        icon: require('./assets/list-outline.png'),
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
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                        icon: require('./assets/list-outline.png'),
                                        text: 'FlatList',
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        }).catch((error) => {
            console.warn("Can't set root navigation", error);
        });
    });
}
