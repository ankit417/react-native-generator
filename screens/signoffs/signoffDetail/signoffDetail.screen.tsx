import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import {format} from 'date-fns';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {useDispatch, useSelector, RootState} from '@src/store';
import {Chip, HStack, VStack} from '@src/commons';
import {colors} from '@src/modules';

import {getSignoffDetail} from './signoffDetail.slice';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';
import {styles} from './signoffDetail.style';

interface SignoffDetailProps
  extends NativeStackScreenProps<
    IncompleteStackParamList & CompleteStackParamList,
    'Incomplete_SignoffDetail' | 'Complete_SignoffDetail'
  > {}

const SignoffDetail = ({route}: SignoffDetailProps) => {
  const signOffId = route.params.signOffId;

  const dispatch = useDispatch();
  const {loading, data} = useSelector(
    (state: RootState) => state.signoffDetail,
  );
  const queryData = data?.data.data;

  useEffect(() => {
    dispatch(getSignoffDetail({signOffId, type: 'job'}));
  }, [dispatch, signOffId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!queryData) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <VStack gap={0}>
        <View style={styles.itemWrapper}>
          <View>
            <View style={styles.flexBox}>
              <Text>{`${queryData.job_details?.job_prefix}-${queryData.job_details.job_number}`}</Text>
              <Chip>
                <Text style={[styles.whiteColor, styles.chip]}>
                  {queryData.sign_off_detail.status}
                </Text>
              </Chip>
            </View>
            <Text style={[styles.title]}>{queryData.job_details.title}</Text>
            <View style={styles.flexBox}>
              <Text>{queryData.job_details.description}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color={colors.light.black200}
              />
            </View>
          </View>
        </View>

        <VStack
          style={[styles.itemWrapper, styles.flexBox, styles.flexWrap]}
          gap={60}>
          <View style={styles.width50}>
            <HStack style={styles.iconLabel}>
              <FontAwesome5
                name="user-alt"
                size={20}
                color={colors.light.black200}
              />
              <Text style={[styles.bold, styles.blackColor]}>Signed By</Text>
            </HStack>
            <Text>{`${queryData.employee_details.name} ${queryData.employee_details.lastname}`}</Text>
          </View>

          <View style={styles.width50}>
            <HStack style={styles.iconLabel}>
              <MaterialIcons
                name="calendar-today"
                size={20}
                color={colors.light.black200}
              />
              <Text style={[styles.bold, styles.blackColor]}>
                {format(
                  new Date(queryData.sign_off_detail.signoff_date),
                  'd MMM yyyy',
                )}
              </Text>
            </HStack>
            <Text>{queryData.employee_details.email}</Text>
          </View>
          <View style={styles.width50}>
            <HStack style={styles.iconLabel}>
              <MaterialIcons
                name="mail"
                size={20}
                color={colors.light.black200}
              />
              <Text style={[styles.bold, styles.blackColor]}>Email</Text>
            </HStack>
            <Text>{queryData.employee_details.email}</Text>
          </View>
        </VStack>

        <View style={styles.itemWrapper}>
          <HStack style={styles.iconLabel}>
            <FontAwesome5
              name="file-pdf"
              size={20}
              color={colors.light.black200}
            />
            <Text>View PDF</Text>
          </HStack>
        </View>
        <View style={styles.itemWrapper}>
          <HStack style={styles.iconLabel}>
            <MaterialIcons
              name="mail"
              size={20}
              color={colors.light.black200}
            />
            <Text>Send</Text>
          </HStack>
        </View>
        <View style={styles.itemWrapper}>
          <HStack style={styles.iconLabel}>
            <MaterialIcons
              name="delete"
              size={20}
              color={colors.light.black200}
            />
            <Text>Archive Sign off</Text>
          </HStack>
        </View>
      </VStack>
    </ScrollView>
  );
};

export {SignoffDetail};
