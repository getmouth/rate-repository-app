import React, { useEffect } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Switch, Redirect } from 'react-router-native';
import { useAuthStorage } from '../contexts';
import { useStateValue, loginUser, logoutUser } from '../state';
import theme from '../theme';
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackground,
    },
    Keyboard: {
        flex: 1
    },
});

const Main = () => {

    const authStorage = useAuthStorage();
    const [, dispatch] = useStateValue();

    useEffect(() => {
        (async () => {
            const token = await authStorage.getAccessToken();
            token ? dispatch(loginUser(token)) : logoutUser();

        })();
    }, []);

    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;