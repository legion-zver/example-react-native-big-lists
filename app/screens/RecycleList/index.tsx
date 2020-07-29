import React from 'react';
import {connect} from 'react-redux';
import {NavigationComponentProps, NavigationComponent} from 'react-native-navigation';

interface Props extends NavigationComponentProps {}

class RecycleListScreen extends NavigationComponent<Props> {
    render() {
        return undefined;
    }
}

export default connect()(RecycleListScreen);
