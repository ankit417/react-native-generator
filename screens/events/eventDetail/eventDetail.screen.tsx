import React, {useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootState, useDispatch, useSelector} from '@src/store';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';

import {EventDetailList, EventDetailInfo, Timer} from './components';
import {getEventDetail} from './eventDetail.slice';
import {styles} from './eventDetail.style';

interface EventDetailProps
  extends NativeStackScreenProps<
    IncompleteStackParamList & CompleteStackParamList,
    'Incomplete_Detail' | 'Complete_Detail'
  > {}

const EventDetail = ({route}: EventDetailProps) => {
  const eventId = route.params.eventId;
  const employeeId = route.params.employeeId;
  const dispatch = useDispatch();
  const {loading, data} = useSelector((state: RootState) => state.eventDetail);

  useEffect(() => {
    dispatch(getEventDetail({eventId, employeeId}));
  }, [dispatch, eventId, employeeId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data?.data.data) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <EventDetailInfo data={data.data.data} />
      <Timer data={data.data.data} />
      <EventDetailList data={data.data.data} />
    </ScrollView>
  );
};

export {EventDetail};
