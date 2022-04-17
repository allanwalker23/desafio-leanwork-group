import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import theme from '../global/theme';
import { Home } from '../screens/Home';
import { InfoMovie } from '../screens/InfoMovie';
import { Login } from '../screens/Login';
import { SearchMovie } from '../screens/SearchMovie';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                orientation: 'portrait',
                headerStyle: {
                    backgroundColor: theme.colors.background
                },
                headerTitleStyle: { color: 'white' }
            }}
        >
            <Screen
                name="Login"
                component={Login}
                options={{ title: 'Apresentação' }}
            />

            <Screen
                name="Home"
                component={Home}
                options={{ title: 'Início', headerBackVisible: false }}
            />

            <Screen
                name="SearchMovie"
                component={SearchMovie}
                options={{ title: 'Pesquisa' }}
            />

            <Screen
                name="InfoMovie"
                component={InfoMovie}
                options={{ title: 'Informações do filme' }}
            />
        </Navigator>
    );
}
