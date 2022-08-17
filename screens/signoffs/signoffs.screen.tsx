import React, {useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootState, useDispatch} from '@src/store';
import {VStack} from '@src/commons';
import {useBaseRouteName} from '@src/hooks';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';

import {JobList} from './components';
import {styles} from './signoffs.styles';
import {getSignoffs} from './signoffs.slice';

interface SignoffsProps
  extends NativeStackScreenProps<
    IncompleteStackParamList & CompleteStackParamList,
    'Incomplete_Signoffs' | 'Complete_Signoffs'
  > {}

const Signoffs = ({route, navigation}: SignoffsProps) => {
  const jobId = route.params.jobId;
  const baseRouteName = useBaseRouteName();
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state.signoffs);

  useEffect(() => {
    dispatch(getSignoffs({jobId}));
  }, [dispatch, jobId]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate(`${baseRouteName}_AddSignoff` as any, {jobId})
          }>
          <View>
            <Text>ADD SIGNOFF</Text>
          </View>
        </Pressable>
      </View>
      <VStack>
        <JobList headerText="Jobs" data={data?.job?.data?.data || []} />
      </VStack>
    </ScrollView>
  );
};

export {Signoffs};
