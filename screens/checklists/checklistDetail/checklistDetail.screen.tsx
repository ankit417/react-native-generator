import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native-gesture-handler';

import {RootState, useDispatch, useSelector} from '@src/store';
import {VStack} from '@src/commons';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';

import {CheckList} from './component';
import {getChecklistDetail} from './checklistDetail.slice';
import {styles} from './checklistDetail.style';

interface ChecklistDetailProps
  extends NativeStackScreenProps<
    IncompleteStackParamList & CompleteStackParamList,
    'Incomplete_ChecklistDetail' | 'Complete_ChecklistDetail'
  > {}

const ChecklistDetail = ({route}: ChecklistDetailProps) => {
  const checklistId = route.params.checklistId;

  const dispatch = useDispatch();
  const {loading, data} = useSelector(
    (state: RootState) => state.checklistDetail,
  );
  const queryData = data?.data.data;

  useEffect(() => {
    dispatch(getChecklistDetail({checklistId}));
  }, [checklistId, dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!queryData) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <VStack>
        <View style={styles.header}>
          <Text style={styles.headerText}>BACK TO FERG-1B : ABC</Text>
        </View>

        <View style={styles.aboutJobWrapper}>
          <Text style={styles.aboutJobDateText}>
            Created on 29/07/2022 11:32 AM by John
          </Text>
          <View style={styles.aboutJobDescription}>
            <View style={styles.aboutJobDescription}>
              <Text style={styles.label}>Completed by: </Text>
              <Text style={styles.aboutJobBoldText}>John</Text>
            </View>
            <View style={styles.aboutJobDescription}>
              <Text style={styles.label}>Assigned to: </Text>
              <Text style={styles.aboutJobBoldText}>John</Text>
            </View>
            <View style={styles.aboutJobDescription}>
              <Text style={styles.label}>Due Date: </Text>
              <Text style={styles.aboutJobBoldText}>John</Text>
            </View>
          </View>
        </View>

        <Text style={styles.rulesDescriptionText}>
          Please remember to follow physical distancing rules and hygience
          practices as per covid-19 procedures and protocols. Be Kind,smile, and
          be polite
        </Text>

        <CheckList
          checklists={queryData.checklist_items}
          checklistId={queryData.checklist_details.id}
        />
      </VStack>
    </ScrollView>
  );
};

export {ChecklistDetail};
