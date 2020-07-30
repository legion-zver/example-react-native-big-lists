import React from 'react';
import moment from 'moment';
import numbro from 'numbro';
import {connect} from 'react-redux';
import {Image, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';

import {State as ReduxState} from '../../reducers';

import styles from './styles';

interface Props {
    numberOfLines?: number;
    id: string;
}

interface InnerProps extends Props {
    isRTL?: boolean;
    tweet?: any;
    user?: any;
}

const MetricsItem = ({value, icon}: any) => (
    <View style={styles.metricItem}>
        {icon ? <Image resizeMode="contain" style={styles.metricIcon} source={icon} /> : null}
        <Text style={styles.metricValue}>{numbro(value).format({spaceSeparated: false, average: true})}</Text>
    </View>
);

const TweetRow = ({user, tweet, isRTL, numberOfLines}: InnerProps) => {
    const avatar = user ? (
        <Animatable.View useNativeDriver duration={400} animation={isRTL ? 'fadeInRight' : 'fadeInLeft'}>
            <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={[styles.avatar, isRTL ? {marginLeft: 16} : {marginRight: 16}]}
                source={{
                    uri: user.profile_image_url,
                }}
            />
        </Animatable.View>
    ) : null;
    return (
        <View style={styles.container}>
            {!isRTL ? avatar : null}
            <View style={styles.info}>
                {user ? (
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userAlias}>@{user.username}</Text>
                    </View>
                ) : null}
                <Text style={styles.text} numberOfLines={numberOfLines}>
                    {tweet?.text}
                </Text>
                <Text style={styles.date} numberOfLines={1}>
                    {moment(tweet?.created_at).format('YYYY.MM.DD HH:mm:ss')}
                </Text>
                <View style={styles.metrics}>
                    <MetricsItem
                        icon={require('../../assets/message-circle-outline.png')}
                        value={tweet?.public_metrics?.reply_count || 0}
                    />
                    <MetricsItem
                        icon={require('../../assets/refresh-outline.png')}
                        value={tweet?.public_metrics?.retweet_count || 0}
                    />
                    <MetricsItem
                        icon={require('../../assets/heart-outline.png')}
                        value={tweet?.public_metrics?.like_count || 0}
                    />
                </View>
            </View>
            {isRTL ? avatar : null}
        </View>
    );
};

export default connect((state: ReduxState, props: Props) => {
    const tweet = state.tweets.map[props.id];
    return {
        user: state.tweets.users[tweet?.author_id],
        tweet,
    };
})(TweetRow);
