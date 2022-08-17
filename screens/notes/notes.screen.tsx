import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {styles} from './notes.styles';

interface NotesProps extends NativeStackScreenProps<any> {}

const Notes = ({}: NotesProps) => {
  return (
    <View style={styles.container}>
      <Text>NOTES SCREEN</Text>
    </View>
  );
};

export {Notes};
