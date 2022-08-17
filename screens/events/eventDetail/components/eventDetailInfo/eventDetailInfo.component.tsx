import React from 'react';
import {Text, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import {HrLine, VStack} from '@src/commons';

import {styles} from './eventDetailInfo.style';
import {EventDetailType} from '../../eventDetail.service';

interface EventProps {
  jobPrefix: string;
  siteVisitTitle: string;
  siteVisitDescription: string;
  status: string;
}

const Event = ({
  jobPrefix,
  siteVisitTitle,
  siteVisitDescription,
  status,
}: EventProps) => {
  return (
    <View style={styles.eventWrapper}>
      <VStack>
        <View style={styles.eventInfo}>
          <View style={styles.logoLabel}>
            <View style={styles.logo}>
              <Ionicons name="ios-calendar-sharp" size={50} color={'#000'} />
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.labelTop}>{jobPrefix}</Text>
              <Text style={styles.labelBottom}>Site Visit</Text>
            </View>
          </View>
          <View style={styles.eventChip}>
            <Text style={styles.chipText}>{status}</Text>
          </View>
        </View>
        <View style={styles.eventDescription}>
          <Text style={styles.eventTitle}>{siteVisitTitle}</Text>
          <Text style={styles.eventDetail}>{siteVisitDescription}</Text>
        </View>
        <HrLine />
      </VStack>
    </View>
  );
};

interface EvenLocationDetailProps {
  customerName: string;
  address: {
    id: number;
    city: string;
    state?: null;
    suburb?: null;
    address: string;
    country: string;
    zip_code: number;
  };
}

const EventLocationDetail = ({
  customerName,
  address,
}: EvenLocationDetailProps) => {
  const addressString = [address.city, address.state, address.country].join(
    ', ',
  );

  return (
    <View style={styles.locationInfoWrapper}>
      <View>
        <FaIcon name="user" size={34} color={'#000'} />
      </View>
      <View style={styles.locationInfoLabelWrapper}>
        <Text style={styles.locationInfoLabel}>Amazon</Text>
        <Text style={styles.locationInfoLabel}>{customerName}</Text>
        <Text style={styles.locationInfoLabel}>{addressString}</Text>
      </View>
      <View style={styles.markerIcon}>
        <Ionicons name="location-sharp" size={30} color={'#285B7F'} />
      </View>
    </View>
  );
};

const EventDetailInfo = ({data}: {data: EventDetailType}) => {
  const {
    address_details,
    customer_details,
    employee_details,
    job_details,
    site_visit_details,
  } = data;

  return (
    <View style={styles.container}>
      <VStack>
        <Event
          jobPrefix={job_details.job_prefix}
          siteVisitTitle={site_visit_details.title}
          siteVisitDescription={site_visit_details.description}
          status={
            employee_details.is_labour_complete ? 'Complete' : 'Incomplete'
          }
        />
        <EventLocationDetail
          customerName={customer_details.name}
          address={address_details}
        />
      </VStack>
    </View>
  );
};

export {EventDetailInfo};
