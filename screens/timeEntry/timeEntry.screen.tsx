import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, RefreshControl, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {format} from 'date-fns';

import {RootState, useDispatch} from '@src/store';
import {NoticeCard, TimeEntryModal} from '@src/components';
import {HStack, VStack} from '@src/commons';
import {colors} from '@src/modules';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';

import {styles} from './timeEntry.style';
import {getTimeEntries, updateTimeEntry} from './timeEntry.slice';
import {TimeEntriesType} from './timeEntry.service';

interface TimeEntryProps
  extends NativeStackScreenProps<
    IncompleteStackParamList & CompleteStackParamList,
    'Incomplete_TimeEntry' | 'Complete_TimeEntry'
  > {}

const TimeEntry = ({route}: TimeEntryProps) => {
  const siteVisitId = route.params.siteVisitId;
  const dispatch = useDispatch();
  const {loading, data} = useSelector((state: RootState) => state.timeEntry);
  const queryData = data?.data.data ?? [];

  const fetchData = useCallback(() => {
    dispatch(getTimeEntries({siteVisitId}));
  }, [siteVisitId, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchData} />
      }>
      <View style={styles.body}>
        <VStack gap={0}>
          {queryData.map((item, index) => {
            const timeEntries = item.time_entries ?? [];
            return (
              <React.Fragment key={index}>
                <HStack
                  style={[styles.flexRow, styles.alignCenter, styles.bodytop]}>
                  <View
                    style={[
                      styles.flexRow,
                      styles.alignCenter,
                      styles.justifyCenter,
                      styles.avatar,
                    ]}>
                    <Text style={[styles.whiteColor, styles.bold]}>
                      {item.employee_detail.employee_name.charAt(0)}
                    </Text>
                  </View>
                  <Text style={styles.bold}>
                    {item.employee_detail.employee_name}
                  </Text>
                </HStack>

                {timeEntries.length > 0 ? (
                  timeEntries.map((elem, i) => {
                    return (
                      <TimeEntryItem
                        key={`${index}-${i}`}
                        {...elem}
                        siteVisitId={siteVisitId}
                      />
                    );
                  })
                ) : (
                  <NoticeCard message="No time entries" />
                )}
              </React.Fragment>
            );
          })}
        </VStack>
      </View>
    </ScrollView>
  );
};

// MARK: - TimeEntryItem
const TimeEntryItem = ({
  date,
  start_time,
  end_time,
  description,
  duration,
  rate,
  id,
  siteVisitId,
}: TimeEntriesType & {siteVisitId: number}) => {
  const dispatch = useDispatch();
  const [timeEntryModalVisible, setTimeEntryModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.itemWrapper}
        activeOpacity={0.6}
        onPress={() => setTimeEntryModalVisible(true)}>
        <View style={styles.flexBox}>
          <VStack gap={4} style={(styles.flexColumn, {flex: 1})}>
            <Text style={styles.bold}>
              {format(new Date(date), 'd MMM')}{' '}
              {format(new Date(start_time), 'hh:mm a')}-{' '}
              {format(new Date(end_time), 'hh:mm a')}
            </Text>

            <View>
              <Text>{description}</Text>
            </View>
            <View style={[styles.flexRow, styles.justifyEnd]}>
              <Text style={styles.bold}>
                {parseFloat(String(duration)).toFixed(1)} hours
              </Text>
            </View>
          </VStack>
          <View style={[styles.flexColumn, styles.justifyCenter]}>
            <Fontisto
              name="angle-right"
              size={14}
              color={colors.light.grey200}
            />
          </View>
        </View>
      </TouchableOpacity>

      <TimeEntryModal
        startTime={start_time}
        endTime={end_time}
        date={date}
        description={description}
        rate={String(rate)}
        visible={timeEntryModalVisible}
        onClose={() => setTimeEntryModalVisible(false)}
        showDialogOnSave={false}
        onSave={({isWorkComplete: _, ...rest}) => {
          dispatch(
            updateTimeEntry({
              siteVisitId,
              timeEntryId: id,
              body: rest,
              onSuccess: () => setTimeEntryModalVisible(false),
            }),
          );
        }}
      />
    </>
  );
};

export {TimeEntry};
