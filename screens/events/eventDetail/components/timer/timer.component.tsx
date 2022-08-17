import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {useDispatch} from '@src/store';
import {HrLine, VStack} from '@src/commons';
import {TimeEntryModal} from '@src/components';
import {colors} from '@src/modules';

import {useTimer} from './hooks';
import {createTimer, deleteTimer, createTimeEntry} from './timer.slice';
import {styles} from './timer.style';
import type {EventDetailType} from '../../eventDetail.service';

const Timer = ({data}: {data: EventDetailType}) => {
  const dispatch = useDispatch();
  const {timerStarted, loggedTime, stopTimer} = useTimer(data.timer.started_at);
  const [timeEntryModalVisible, setTimeEntryModalVisible] = useState(false);

  return (
    <>
      <VStack>
        <HrLine />
        <View style={styles.eventInfoButtonWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.eventInfoButton,
              {
                backgroundColor: timerStarted
                  ? colors.light.red
                  : colors.light.green,
              },
            ]}
            onPress={() => {
              if (timerStarted) {
                setTimeEntryModalVisible(true);
              } else {
                dispatch(
                  createTimer({
                    eventId: data.events.id,
                    jobId: data.job_details.id,
                    startedBy: data.employee_details.id,
                  }),
                );
              }
            }}>
            {timerStarted ? (
              <>
                <Entypo name="controller-stop" size={20} color={'#FFF'} />
                <Text style={styles.eventInfoButtonText}>
                  Stop Timer: {loggedTime}
                </Text>
              </>
            ) : (
              <>
                <Entypo name="controller-play" size={20} color={'#FFF'} />
                <Text style={styles.eventInfoButtonText}>Start Timer</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.eventInfoButtonRight,
              {
                backgroundColor: timerStarted
                  ? colors.light.red
                  : colors.light.green,
              },
            ]}
            onPress={() =>
              Alert.alert(
                'Cancel Timer',
                'Are you sure you want to cancel the timer ?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Confirm',
                    onPress: () => {
                      if (data.timer.id) {
                        dispatch(
                          deleteTimer({
                            timerId: data.timer.id,
                            onSuccess: () => stopTimer(),
                          }),
                        );
                      }
                    },
                    style: 'destructive',
                  },
                ],
              )
            }
            disabled={!timerStarted}>
            {timerStarted ? (
              <Entypo name="cross" size={24} color={'#FFF'} />
            ) : (
              <Entypo name="plus" size={24} color={'#FFF'} />
            )}
          </TouchableOpacity>
        </View>
        <HrLine />
      </VStack>

      <TimeEntryModal
        startTime={data.timer.started_at}
        visible={timeEntryModalVisible}
        onClose={() => setTimeEntryModalVisible(false)}
        onSave={({
          date,
          description,
          endTime,
          startTime,
          isWorkComplete,
          rate,
        }) => {
          if (data.timer.id) {
            dispatch(
              createTimeEntry({
                data: {
                  date,
                  startTime,
                  endTime,
                  assignedEmployeeId: data.employee_details.id,
                  description,
                  isWorkComplete,
                  rate,
                  onGoingEventId: data.timer.id,
                },
                onSuccess: () => {
                  setTimeEntryModalVisible(false);
                  stopTimer();
                },
              }),
            );
          }
        }}
      />
    </>
  );
};

export {Timer};
