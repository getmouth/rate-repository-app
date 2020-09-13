import React from 'react';
import { View } from 'react-native';
import Text from './Text';
import { shortNum } from '../util';

const RepoFooterItem = ({ feedback, name }) => {

    const thousand = 1000;

    return (
        <View>
            <Text fontWeight="bold" fontSize="subheading">
                {
                    feedback < thousand
                        ? feedback
                        : shortNum(feedback)
                }
            </Text>
            <Text>
                {name}
            </Text>
        </View>
    );
};

export default RepoFooterItem;