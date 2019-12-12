import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Home';
import Shopbag from './src/screens/Shopbag';
import Recipes from './src/screens/Recipes';

const navigation = createStackNavigator(
    {
    Home: {
        screen: Home,
      },
    Shopbag: {
        screen : Shopbag,
      },
    Recipes: {
        screen : Recipes,
    },
    },
    {
      initialRouteName: 'Home',
    });


export default createAppContainer(navigation);