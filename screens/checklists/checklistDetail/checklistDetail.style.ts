import {StyleSheet} from 'react-native';

import {colors, fonts} from '@src/modules';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.light.white,
  },
  header: {
    paddingVertical: 10,
  },
  headerText: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    color: colors.light.primaryColor,
  },
  rulesDescriptionText: {
    color: colors.light.black100,
    fontSize: fonts.size.medium,
    fontWeight: '500',
  },
  aboutJobWrapper: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.light.grey300,
  },
  aboutJobDateText: {
    fontSize: fonts.size.medium,
  },
  aboutJobDescription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutJobTextWrapper: {
    flexDirection: 'row',
  },
  label: {
    fontSize: fonts.size.medium,
  },
  aboutJobBoldText: {
    fontWeight: 'bold',
    fontSize: fonts.size.medium,
  },
});

export {styles};
