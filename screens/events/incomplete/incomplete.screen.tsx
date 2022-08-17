import React, {useCallback, useEffect} from 'react';
import {FlatList, Text, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useDispatch, useSelector, RootState} from '@src/store';
import {JobCard, NoticeCard} from '@src/components';

import {getInCompleteEvent} from './incomplete.slice';
import {styles} from './incomplete.style';
import type {IncompleteStackParamList} from './types';

interface IncompleteProps
  extends NativeStackScreenProps<IncompleteStackParamList> {}

const Incomplete = ({navigation}: IncompleteProps) => {
  const dispatch = useDispatch();
  const {loading, data} = useSelector((state: RootState) => state.incomplete);
  const queryData = data?.data.data;

  const fetchIncompleteUserEvents = useCallback(() => {
    dispatch(getInCompleteEvent());
  }, [dispatch]);

  useEffect(() => {
    fetchIncompleteUserEvents();
  }, [fetchIncompleteUserEvents]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={queryData ?? []}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={fetchIncompleteUserEvents}
        />
      }
      renderItem={({item}) => (
        <JobCard
          onPress={() =>
            navigation.navigate('Incomplete_Detail', {
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

export {Incomplete};
