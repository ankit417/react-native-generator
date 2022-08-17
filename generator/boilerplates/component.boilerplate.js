const capitalize = require("../utils/capitalize");

exports.componentBoilerplate = (fileName) => {
  const name = capitalize(fileName);
  return `import React from 'react';
import {Text, View} from 'react-native';
  
import {styles} from './${fileName}.style';
  
const ${name} = () => {
    return (
     <View style={styles.container}>
      <Text>${name} Component </Text>
     </View>
    );
  };
  
export {${name}};`;
};
