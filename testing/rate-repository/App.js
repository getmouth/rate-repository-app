import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apolloClient';
import { AuthStorageProvider } from './src/contexts';
import { StateProvider, reducer } from './src/state';
import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <StateProvider reducer={reducer}>
          <AuthStorageProvider value={authStorage}>
            <Main />
          </AuthStorageProvider>
        </StateProvider>
      </ApolloProvider>
    </NativeRouter>
  );
}
