import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native-gesture-handler';

import {RootState, useDispatch, useSelector} from '@src/store';
import {Button} from '@src/commons';
import type {IncompleteStackParamList} from '@src/screens/events/incomplete/types';
import type {CompleteStackParamList} from '@src/screens/events/complete/types';

import {ListFile} from './component/listFile';
import {postFilePhotos} from './filePhotos.slice';
import {styles} from './filesPhotos.style';

interface FilesPhotosProps
  extends NativeStackScreenProps<
    IncompleteStackParamList & CompleteStackParamList,
    'Incomplete_FilesAndPhotos' | 'Complete_FilesAndPhotos'
  > {}

const FilesPhotos = ({route}: FilesPhotosProps) => {
  const jobId = route.params.jobId;
  const dispatch = useDispatch();
  const {loading} = useSelector((state: RootState) => state.filePhoto);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <ListFile
        onSubmit={files => {
          const formData = new FormData();
          files.forEach(file => formData.append('image', file));
          dispatch(postFilePhotos({jobId, data: formData}));
        }}>
        {({handleSelect, handleSubmit, images}) => (
          <>
            <View style={styles.buttonWrapper}>
              <Button
                title="Select files ( Image / PDF )"
                onPress={handleSelect}
              />
            </View>

            {images}

            <View style={styles.buttonWrapper}>
              <Button title="Upload" onPress={handleSubmit} />
            </View>
          </>
        )}
      </ListFile>
    </ScrollView>
  );
};

export {FilesPhotos};
