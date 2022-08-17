const capitalize = require("../utils/capitalize");

exports.screenBoilerplate = (fileName) => {
  const name = capitalize(fileName);

  return `import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
  
import {styles} from './${fileName}.style';
  
interface ${name}Props extends NativeStackScreenProps<any> {}
  
const ${name} = ({}: ${name}Props) => {
  return (
    <View style={styles.container}>
      <Text>${name} SCREEN</Text>
    </View>
  );
};
  
export {${name}};`;
};
