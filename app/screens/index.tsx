import React from 'react';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {FLAT_LIST_SCREEN, AUTO_COMPLETE_SCREEN, RECYCLE_LIST_VIEW_SCREEN} from '../constants';

import AutoCompleteScreen from './AutoComplete';
import RecycleListScreen from './RecycleList';
import FlatListScreen from './FlatList';

function withRedux(Component: any, store: Store) {
    return function inject(props: any) {
        return (
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        );
    };
}

export function registerScreens(store: Store) {
    Navigation.registerComponent(RECYCLE_LIST_VIEW_SCREEN, () => withRedux(RecycleListScreen, store));
    Navigation.registerComponent(AUTO_COMPLETE_SCREEN, () => withRedux(AutoCompleteScreen, store));
    Navigation.registerComponent(FLAT_LIST_SCREEN, () => withRedux(FlatListScreen, store));
    console.info('[INFO] All screens have been registered...');
}
