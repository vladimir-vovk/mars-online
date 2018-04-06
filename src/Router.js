import React from 'react';
import { StackNavigator } from 'react-navigation';
import Missions from './components/Missions';
import Gallery from './components/Gallery';
import colors from './config/colors';

const Router = StackNavigator(
  {
    Missions: {
      screen: Missions,
    },
    Gallery: {
      screen: Gallery,
    },
  },
  {
    initialRouteName: 'Missions',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.header,
      },
      headerTitleStyle: {
        color: colors.fontLight,
      },
      headerBackTitleStyle: {
        color: colors.fontLight,
      },
      headerTintColor: colors.fontLight,
    },
  },
);

export default Router;
