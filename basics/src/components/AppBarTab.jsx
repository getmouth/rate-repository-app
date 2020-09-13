import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  tab: {
    color: theme.colors.white,
    marginLeft: 20,
    paddingBottom: 5
  }
});

const AppBarTab = () => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Link to="/" component={TouchableOpacity} activeOpacity={0.8} >
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
          <Text style={styles.tab}>SignIn</Text>
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
