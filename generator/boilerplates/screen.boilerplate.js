exports.screenBoilerplate = (fileName) => {
  return `import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
  
import {styles} from './${fileName}.styles';
  
interface ${fileName}Props extends NativeStackScreenProps<any> {}
  
const ${fileName} = ({}: ${fileName}Props) => {
  return (
    <View style={styles.container}>
      <Text>${fileName} SCREEN</Text>
    </View>
  );
};
  
export {${fileName}};`;
};
