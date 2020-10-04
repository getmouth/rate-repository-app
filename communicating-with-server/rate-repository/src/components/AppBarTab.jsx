import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import { Link } from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import { useStateValue, logoutUser } from '../state';
import { useAuthStorage } from '../contexts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tab: {
    color: theme.colors.white,
    marginLeft: 20,

  },
  user: {
    color: theme.colors.white,
    marginLeft: 20,
    paddingBottom: 5,
    textAlign: 'center',
    textTransform: 'capitalize',
    backgroundColor: 'red',
  },
});

const AppBarTab = () => {
  const [{ token, user }, dispatch] = useStateValue();
  const authSotorage = useAuthStorage();
  const AppolloClient = useApolloClient();

  const onSignout = async () => {
    await authSotorage.removeAccessToken();
    dispatch(logoutUser());
    AppolloClient.resetStore();

  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Link to="/" component={TouchableOpacity} activeOpacity={0.8} >
          <Text style={styles.tab}>Repositories</Text>
        </Link>

        {token ? (
          <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
            <Text style={styles.tab} onPress={onSignout}>Sign Out</Text>
          </Link>
        ) : (
            <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
              <Text style={styles.tab}>Sign In</Text>
            </Link>
          )}
        {user ?
          <Link component={TouchableOpacity} activeOpacity={0.8}>
            <Text style={styles.tab}>{user.username}</Text>
          </Link>
          : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
