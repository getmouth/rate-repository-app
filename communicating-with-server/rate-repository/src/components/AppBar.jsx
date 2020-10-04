import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.barBackground,
        paddingBottom: 15,
    },
    scroll: {
        paddingBottom: 5
    }
});

const AppBar = () => {

    return (

        <View style={styles.container}>
            <ScrollView horizontal style={styles.scroll}>
                <AppBarTab />
            </ScrollView>
        </View>
    );
};

export default AppBar;