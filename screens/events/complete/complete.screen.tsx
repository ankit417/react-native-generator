import React, {useCallback, useEffect} from 'react';
import {FlatList, Text, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootState, useDispatch, useSelector} from '@src/store';
import {JobCard, NoticeCard} from '@src/components';

import {styles} from './complete.style';
import {getCompletedUserEvents} from './complete.slice';
import type {CompleteStackParamList} from './types';

interface CompleteProps
  extends NativeStackScreenProps<CompleteStackParamList> {}

const Complete = ({navigation}: CompleteProps) => {
  const dispatch = useDispatch();
  const {loading, data} = useSelector((state: RootState) => state.complete);
  const queryData = data?.data.data;

  const fetchCompletedUserEvents = useCallback(() => {
    dispatch(getCompletedUserEvents());
  }, [dispatch]);

  useEffect(() => {
    fetchCompletedUserEvents();
  }, [fetchCompletedUserEvents]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={queryData ?? []}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={fetchCompletedUserEvents}
        />
      }
      renderItem={({item}) => (
        <JobCard
          onPress={() =>
            navigation.navigate('Complete_Detail', {
              eventId: item.events.id,
              employeeId: item.employee_details.id,
            })
          }
          jobName={`${item.job_details.job_prefix}_${item.job_details.job_number}`}
          jobStatus={
            item.employee_details.is_labour_complete ? 'Complete' : 'Incomplete'
          }
          customerName={item.customer_details.name}
          customerAddress={item.address_details.address}
          jobTitle={item.job_details.job_title}
          jobDescription={item.site_visit_details.description}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
      style={styles.content}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<NoticeCard message="No results found!" />}
    />
  );
};

export {Complete};
