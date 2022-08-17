import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@src/modules';
import {ScreenWrapper} from '@src/commons';
import {Complete, EventDetail} from '@src/screens/events';
import {Signoffs, SignoffDetail, AddSignoff} from '@src/screens/signoffs';
import {CheckList, ChecklistDetail} from '@src/screens/checklists';
import {TimeEntry} from '@src/screens/timeEntry';
import {FilesPhotos} from '@src/screens/filesPhotos';

import {styles} from './complete.style';
import type {CompleteStackParamList} from './types';

const CompleteStack = createNativeStackNavigator<CompleteStackParamList>();
const CompleteStackRoute = () => (
  <CompleteStack.Navigator>
    <CompleteStack.Screen
      name="Complete"
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
          <Complete {...props} />
        </ScreenWrapper>
      )}
    </CompleteStack.Screen>
    <CompleteStack.Screen name="Complete_Detail" options={{title: 'Detail'}}>
      {props => (
        <ScreenWrapper>
          <EventDetail {...props} />
        </ScreenWrapper>
      )}
    </CompleteStack.Screen>
    <CompleteStack.Screen
      name="Complete_Signoffs"
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
    </CompleteStack.Screen>
    <CompleteStack.Screen
      name="Complete_SignoffDetail"
      options={{title: 'Detail'}}>
      {props => (
        <ScreenWrapper>
          <SignoffDetail {...props} />
        </ScreenWrapper>
      )}
    </CompleteStack.Screen>
    <CompleteStack.Screen
      name="Complete_AddSignoff"
      options={{
        animation: 'none',
        title: 'Add Signoff',
      }}>
      {props => (
        <ScreenWrapper>
          <AddSignoff {...props} />
        </ScreenWrapper>
      )}
    </CompleteStack.Screen>
    <CompleteStack.Screen
      name="Complete_TimeEntry"
      options={{title: 'Time Entries'}}>
      {props => (
        <ScreenWrapper>
          <TimeEntry {...props} />
        </ScreenWrapper>
      )}
    </CompleteStack.Screen>
    <CompleteStack.Screen
      name="Complete_Checklists"
      options={{title: 'Checklists'}}>
      {props => (
        <ScreenWrapper>
          <CheckList {...props} />
        </ScreenWrapper>
      )}
    </CompleteStack.Screen>
    <CompleteStack.Screen
      name="Complete_ChecklistDetail"
      options={{title: 'Detail'}}>
      {props => (
        <ScreenWrapper>
          <ChecklistDetail {...props} />
        </ScreenWrapper>
      )}
    </CompleteStack.Screen>
    <CompleteStack.Screen
      name="Complete_FilesAndPhotos"
      options={{title: 'Files and Photos'}}>
      {props => (
        <ScreenWrapper>
          <FilesPhotos {...props} />
        </ScreenWrapper>
      )}
    </CompleteStack.Screen>
  </CompleteStack.Navigator>
);

export {CompleteStackRoute};
