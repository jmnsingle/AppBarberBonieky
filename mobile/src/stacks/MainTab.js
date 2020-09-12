import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabBar = createBottomTabNavigator();

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

export default () => (
  <TabBar.Navigator
    tabBar={props => <CustomTabBar {...props} />}
  >
    <TabBar.Screen name='Home' component={Home} />
    <TabBar.Screen name='Search' component={Search} />
    <TabBar.Screen name='Appointments' component={Appointments} />
    <TabBar.Screen name='Favorites' component={Favorites} />
    <TabBar.Screen name='Profile' component={Profile} />
  </TabBar.Navigator>
)
