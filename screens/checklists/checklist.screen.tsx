import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {RootState, useDispatch, useSelector} from '@src/store';
import {Chip, HStack, VStack} from '@src/commons';
import {NoticeCard} from '@src/components';
import {useBaseRouteName} from '@src/hooks';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';

import {getChecklists} from './checklists.slice';
import {styles} from './checklist.style';
import type {ChecklistItem} from './checklists.service';

interface ChecklistProps
  extends NativeStackScreenProps<
    IncompleteStackParamList & CompleteStackParamList,
    'Incomplete_Checklists' | 'Complete_Checklists'
  > {}

const CheckList = ({route}: ChecklistProps) => {
  const jobId = route.params.jobId;
  const siteVisitId = route.params.siteVisitId;

  const dispatch = useDispatch();

  const {loading, data} = useSelector((state: RootState) => state.checklist);
  const queryData = data?.data.data;
  const checklists = queryData?.checklists ?? [];

  useEffect(() => {
    dispatch(getChecklists({jobId, siteVisitId}));
  }, [dispatch, jobId, siteVisitId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <CheckListHeader />

      {checklists.length > 0 ? (
        checklists.map((item, index) => {
          return <CheckListItem key={index} {...item} />;
        })
      ) : (
        <NoticeCard message="No checklists found!" />
      )}
    </ScrollView>
  );
};

// MARK: - CheckListHeader
const CheckListHeader = () => {
  return (
    <HStack style={styles.checklistHeaderWrapper}>
      <View>
        <EntypoIcon name="calendar" size={32} color={'#000'} />
      </View>
      <View>
        <Text style={styles.checklistHeaderTitle}>FERG - 1b</Text>
        <Text style={styles.checklistHeaderDesc}>Ferg 1b test started</Text>
      </View>
    </HStack>
  );
};

// MARK: - CheckListItem
const CheckListItem = ({
  id,
  checked_item,
  due_date,
  name,
  total_item,
}: ChecklistItem) => {
  const baseRouteName = useBaseRouteName();
  const navigation =
    useNavigation<
      NativeStackScreenProps<
        IncompleteStackParamList & CompleteStackParamList
      >['navigation']
    >();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.checklistItemWrapper}
      onPress={() =>
        navigation.navigate(`${baseRouteName}_ChecklistDetail` as any, {
          checklistId: id,
        })
      }>
      <VStack>
        <View style={styles.checklistItemHeader}>
          <View style={styles.checklistItemHeaderTextWrapper}>
            <Text style={styles.checklistItemHeaderText}>{name}</Text>
          </View>
          <View>
            <Chip>
              <Text style={styles.chipText}>
                {checked_item < total_item ? 'In Progress' : 'Complete'}
              </Text>
            </Chip>
          </View>
        </View>
        <View style={styles.checklistItemEndWrapper}>
          <View>
            <Text
              style={
                styles.checklistItemCompleted
              }>{`${checked_item} / ${total_item} Complete`}</Text>
          </View>
          <View style={styles.checklistItemMidTextItem}>
            <Text style={styles.checklistItemMidTextLeft}>Due date: </Text>
            <Text style={styles.checklistItemMidTextRight}>{due_date}</Text>
          </View>
        </View>
      </VStack>
    </TouchableOpacity>
  );
};

export {CheckList};
