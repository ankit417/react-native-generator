import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import IoIcon from 'react-native-vector-icons/Ionicons';

import {CompleteStackRoute, IncompleteStackRoute} from '@src/screens/events';
import {colors} from '@src/modules';

type EventsRoutesParamList = {
  IncompleteStack: undefined;
  CompleteStack: undefined;
};

const EventsTab = createBottomTabNavigator<EventsRoutesParamList>();
const EventsRoute = () => (
  <EventsTab.Navigator screenOptions={{headerShown: false}}>
    <EventsTab.Screen
      name="IncompleteStack"
      options={{
        tabBarIcon: ({focused}) => (
          <FaIcon
            name="list-ul"
            size={20}
            color={focused ? colors.light.primaryColor : colors.light.grey200}
          />
        ),
        title: 'Incomplete',
      }}
      component={IncompleteStackRoute}
    />
    <EventsTab.Screen
      name="CompleteStack"
      options={{
        tabBarIcon: ({focused}) => (
          <IoIcon
            name="ios-layers"
            size={20}
            color={focused ? colors.light.primaryColor : colors.light.grey200}
          />
        ),
        title: 'Complete',
      }}
      component={CompleteStackRoute}
    />
  </EventsTab.Navigator>
);

export {EventsRoute};
export type {EventsRoutesParamList};
