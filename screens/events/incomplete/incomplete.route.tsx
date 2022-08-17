import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@src/modules';
import {ScreenWrapper} from '@src/commons';
import {Incomplete, EventDetail} from '@src/screens/events';
import {AddSignoff, SignoffDetail, Signoffs} from '@src/screens/signoffs';
import {TimeEntry} from '@src/screens/timeEntry';
import {CheckList, ChecklistDetail} from '@src/screens/checklists';
import {FilesPhotos} from '@src/screens/filesPhotos';

import {styles} from './incomplete.style';
import type {IncompleteStackParamList} from './types';

const IncompleteStack = createNativeStackNavigator<IncompleteStackParamList>();
const IncompleteStackRoute = () => (
  <IncompleteStack.Navigator>
    <IncompleteStack.Screen
      name="Incomplete"
      options={({navigation}) => ({
        title: 'Complete Events',
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.openDrawer()}>
            <EntypoIcon
              name="menu"
              size={28}
              color={colors.light.black}
              style={styles.headerLeftStyle}
            />
          </TouchableOpacity>
        ),
      })}>
      {props => (
        <ScreenWrapper>
          <Incomplete {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
    <IncompleteStack.Screen
      name="Incomplete_Detail"
      options={{title: 'Detail'}}>
      {props => (
        <ScreenWrapper>
          <EventDetail {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
    <IncompleteStack.Screen
      name="Incomplete_Signoffs"
      options={{
        title: 'Signoffs',
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.6} onPress={() => false}>
            <MaterialIcon name="add" size={28} color={colors.light.black} />
          </TouchableOpacity>
        ),
      }}>
      {props => (
        <ScreenWrapper>
          <Signoffs {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
    <IncompleteStack.Screen
      name="Incomplete_AddSignoff"
      options={{
        animation: 'none',
        title: 'Add Signoff',
      }}>
      {props => (
        <ScreenWrapper>
          <AddSignoff {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
    <IncompleteStack.Screen
      name="Incomplete_SignoffDetail"
      options={{title: 'Detail'}}>
      {props => (
        <ScreenWrapper>
          <SignoffDetail {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
    <IncompleteStack.Screen
      name="Incomplete_TimeEntry"
      options={{title: 'Time Entries'}}>
      {props => (
        <ScreenWrapper>
          <TimeEntry {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
    <IncompleteStack.Screen
      name="Incomplete_Checklists"
      options={{title: 'Checklists'}}>
      {props => (
        <ScreenWrapper>
          <CheckList {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
    <IncompleteStack.Screen
      name="Incomplete_ChecklistDetail"
      options={{title: 'Detail'}}>
      {props => (
        <ScreenWrapper>
          <ChecklistDetail {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
    <IncompleteStack.Screen
      name="Incomplete_FilesAndPhotos"
      options={{title: 'Files and Photos'}}>
      {props => (
        <ScreenWrapper>
          <FilesPhotos {...props} />
        </ScreenWrapper>
      )}
    </IncompleteStack.Screen>
  </IncompleteStack.Navigator>
);

export {IncompleteStackRoute};
