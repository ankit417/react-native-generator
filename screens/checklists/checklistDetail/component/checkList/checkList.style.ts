import {StyleSheet} from 'react-native';

import {colors, fonts} from '@src/modules';

const styles = StyleSheet.create({
  checklistHeader: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.light.grey300,
  },
  checklistHeaderText: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    color: '#000',
  },
  iconWrapper: {
    marginRight: 10,
  },
  checklistItemWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.grey400,
  },
  checklistTextWrapper: {},
  checklistTitleWrapper: {},
  checklistTitleText: {
    fontSize: fonts.size.medium,
    color: colors.light.black100,
  },
  headerStyle: {
    fontWeight: 'bold',
  },
  checklistItemDetailWrapper: {
    flexDirection: 'row',
  },
  checklistItemDetailItem: {
    flexDirection: 'row',
  },
  detailLabel: {
    fontSize: fonts.size.small,
  },
  detailValue: {
    fontWeight: 'bold',
    fontSize: fonts.size.small,
  },
});

export {styles};
