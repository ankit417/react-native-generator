import React, {useRef, useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
import {Formik} from 'formik';

import {VStack, Button, TextInput, HrLine, HStack} from '@src/commons';
import {useDispatch} from '@src/store';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';

import {addSignoff} from './addSignoff.slice';
import {styles} from './addSignoff.style';

type AddSignoffData = {
  fName: string;
  lName: string;
  email: string;
  role: string;
  comment: string;
};

interface SignoffDetailProps
  extends NativeStackScreenProps<
    IncompleteStackParamList & CompleteStackParamList,
    'Incomplete_AddSignoff' | 'Complete_AddSignoff'
  > {}

const AddSignoff = ({route}: SignoffDetailProps) => {
  const jobId = route.params.jobId;
  const dispatch = useDispatch();

  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const ref = useRef<SignatureViewRef>(null);

  const handleOK = (signature: string) => {
    setSignatureData(signature);
  };

  const handleClear = () => {
    ref?.current?.clearSignature();
    setSignatureData(null);
    return;
  };

  const handleEnd = () => {
    ref?.current?.readSignature();
  };

  const onSubmit = useCallback(
    (values: AddSignoffData) => {
      if (signatureData) {
        const formData = new FormData();
        formData.append('firstname', values.fName);
        formData.append('lastname', values.lName);
        formData.append('email', values.email);
        formData.append('jobId', jobId);
        formData.append('contactId', 1);
        formData.append('type', 'job');
        formData.append('role', values.role);
        formData.append('comment', values.comment);
        formData.append('signatureBase64', signatureData);

        dispatch(addSignoff(formData));
      }
    },
    [signatureData, jobId, dispatch],
  );

  return (
    <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
      <Formik
        initialValues={{fName: '', lName: '', email: '', role: '', comment: ''}}
        onSubmit={onSubmit}>
        {({handleChange, handleSubmit, values}) => (
          <VStack gap={15} style={styles.formContainer}>
            <HStack gap={15}>
              <View style={styles.nameInput}>
                <TextInput
                  label="First Name *"
                  placeholder="First Name"
                  value={values.fName}
                  onChangeText={handleChange('fName')}
                />
              </View>

              <View style={styles.nameInput}>
                <TextInput
                  label="Last Name *"
                  placeholder="Last Name"
                  value={values.lName}
                  onChangeText={handleChange('lName')}
                />
              </View>
            </HStack>
            <TextInput
              label="Role"
              placeholder="Role"
              value={values.role}
              onChangeText={handleChange('role')}
            />
            <TextInput
              label="Email"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
            />

            <View>
              <Text style={styles.sectionTitle}>Comment</Text>

              <TextInput
                placeholder="Add comment here..."
                multiline={true}
                numberOfLines={6}
                value={values.comment}
                onChangeText={handleChange('comment')}
              />
            </View>

            <View style={styles.signatureWrapper}>
              <SignatureScreen
                androidHardwareAccelerationDisabled
                ref={ref}
                onOK={handleOK}
                onBegin={() => setScrollEnabled(false)}
                onEnd={() => setScrollEnabled(true)}
              />
            </View>

            <HStack gap={15}>
              <Button
                title={'Save'}
                onPress={() => handleEnd()}
                style={styles.button}
                disabled={signatureData ? true : false}
              />
              <Button
                title={'clear'}
                onPress={() => {
                  handleClear();
                }}
                style={styles.button}
              />
            </HStack>
            <HrLine />
            <Button
              title={'Submit'}
              onPress={() => {
                handleSubmit();
              }}
            />
          </VStack>
        )}
      </Formik>
    </ScrollView>
  );
};

export {AddSignoff};
