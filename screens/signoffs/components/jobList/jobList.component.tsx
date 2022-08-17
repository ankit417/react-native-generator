import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

import {HrLine, Chip} from '@src/commons';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';

import {styles} from './jobList.style';
import type {SignoffDetailResponse} from '../../signoffs.service';
import {useBaseRouteName} from '@src/hooks';

interface JobListProps {
  headerText: string;
  data: Array<any>;
}

const JobList = ({headerText, data}: JobListProps) => {
  return (
    <>
      <JobListHeader headerText={headerText} jobLength={data?.length} />
      <JobListCard jobs={data} />
    </>
  );
};

interface JobHeader {
  headerText: string;
  jobLength: number;
}

// MARK: - JobListHeader
const JobListHeader = ({headerText, jobLength}: JobHeader) => {
  return (
    <View style={styles.jobListHeader}>
      <Text style={styles.jobListHeaderText}>{headerText}</Text>
      <View style={styles.jobListHeaderChip}>
        <Text style={styles.jobListHeaderChipText}>{jobLength}</Text>
      </View>
    </View>
  );
};

interface JobListCardProps {
  jobs: Array<SignoffDetailResponse>;
}

// MARK: - JobListCard
const JobListCard = (props: JobListCardProps) => {
  const jobListLastIndex = props.jobs.length - 1;

  const baseRouteName = useBaseRouteName();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        IncompleteStackParamList & CompleteStackParamList
      >
    >();

  return (
    <>
      {props.jobs.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.signOffWrapper}
            key={index}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate(`${baseRouteName}_SignoffDetail` as any, {
                signOffId: item.sign_off_detail.id,
              })
            }>
            <View style={styles.signOffCardContainer}>
              <View style={styles.headerDate}>
                <Text style={styles.dateText}>
                  {format(
                    new Date(item.sign_off_detail.signoff_date),
                    'd MMM yyyy',
                  )}
                </Text>
                <Chip>
                  <Text style={styles.chipText}>
                    {item.sign_off_detail.status}
                  </Text>
                </Chip>
              </View>
              <View style={styles.jobSignedWrapper}>
                <Text
                  style={
                    styles.jobSigned
                  }>{`${item.job_details.job_prefix}-${item.job_details.job_number}`}</Text>
              </View>
              <View style={styles.jobTypeWrapper}>
                <Text style={styles.jobType}>{item.job_details.title}</Text>
              </View>
            </View>
            {index !== jobListLastIndex && <HrLine />}
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export {JobList};
