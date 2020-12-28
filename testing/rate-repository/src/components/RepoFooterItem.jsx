import React from 'react';
import { View } from 'react-native';
import Text from './Text';
import { shortNum } from '../utils/convertNum';

const RepoFooterItem = ({ feedback, name, testID }) => {

  return (
    <View>
      <Text fontWeight="bold" fontSize="subheading" testID={testID}>
        {shortNum(feedback)}
      </Text>
      <Text>
        {name}
      </Text>
    </View>
  );
};

export default RepoFooterItem;