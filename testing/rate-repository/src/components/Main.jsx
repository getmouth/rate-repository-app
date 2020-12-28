import React, { useEffect } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import { useStateValue, loginUser, logoutUser } from '../state';
import RepositoryList from './RepositoryList';
import RepositoryDetails from './RepositoryDetails';
import CreateReview from './CreateReview';
import AppBar from './AppBar';
import { useAuthStorage } from '../contexts';
import theme from '../theme';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

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
                <Route path="/signin" exact>
                    <SignIn />
                </Route>
                <Route path="/signup" exact>
                    <SignUp />
                </Route>
                <Route path="/create_review" exact>
                    <CreateReview />
                </Route>
                <Route path="/reviews" exact>
                    <UserReviews />
                </Route>
                <Route path="/:repoId" exact>
                    <RepositoryDetails />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;