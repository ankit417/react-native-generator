import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {HrLine} from '@src/commons';
import {useBaseRouteName} from '@src/hooks';

import {EventDetailType} from '../../eventDetail.service';
import {styles} from './eventDetail.style';

const EventDetailList = ({data}: {data: EventDetailType}) => (
  <View style={styles.container}>
    <EventList
      events={[
        {
          name: 'Checklists',
          icon: <Octicons name="checklist" size={20} color={'#000000'} />,
          routeName: '_Checklists',
          params: {
            jobId: data.job_details.id,
            siteVisitId: data.site_visit_details.id,
          },
        },
        {
          name: 'Time Entries',
          icon: (
            <MaterialCommunityIcons
              name="clipboard-text-clock-outline"
              size={20}
              color={'#000000'}
            />
          ),
          routeName: '_TimeEntry',
          params: {siteVisitId: data.site_visit_details.id},
        },

        {
          name: 'Sign Off',
          icon: <Fa5Icon name="check-square" size={20} color={'#000000'} />,
          routeName: '_Signoffs',
          params: {jobId: data.job_details.id},
        },
        {
          name: 'Files and Photos',
          icon: <EntypoIcon name="images" size={20} color={'#000000'} />,
          routeName: '_FilesAndPhotos',
          params: {jobId: data.job_details.id},
        },
      ]}
    />
  </View>
);

interface EventList {
  events: Array<{
    name: string;
    icon: React.ReactNode;
    routeName?: string;
    params?: object;
  }>;
}

// MARK: - EventList
const EventList = ({events}: EventList) => {
  const {navigate} = useNavigation<NativeStackScreenProps<any>['navigation']>();
  const baseRouteName = useBaseRouteName();

  return (
    <>
      {events.map(({icon, name, params, routeName}, index) => {
        return (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={styles.itemWrapper}
              onPress={
                routeName
                  ? () => navigate((baseRouteName + routeName) as any, params)
                  : undefined
              }>
              <View style={styles.iconLabel}>
                {icon}
                <Text style={styles.labelText}>{name}</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#cccccc"
              />
            </TouchableOpacity>
            <HrLine />
          </React.Fragment>
        );
      })}
    </>
  );
};

export {EventDetailList};
