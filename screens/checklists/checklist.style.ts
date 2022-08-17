import {StyleSheet} from 'react-native';

import {colors, fonts} from '@src/modules';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  checklistItemWrapper: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.grey300,
  },
  checklistItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checklistItemHeaderTextWrapper: {
    maxWidth: '70%',
  },
  checklistItemHeaderText: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    color: '#000',
  },
  chipText: {
    color: '#FFF',
    fontSize: fonts.size.small,
  },
  checklistItemMidTextItem: {
    flexDirection: 'row',
  },
  checklistItemMidTextLeft: {
    fontSize: fonts.size.medium,
    fontWeight: 'bold',
  },
  checklistItemMidTextRight: {
    marginLeft: 5,
    fontSize: fonts.size.medium,
  },
  checklistItemEndWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checklistItemCompleted: {
    fontSize: fonts.size.medium,
  },
  hrlineWrapper: {
    paddingVertical: 10,
  },
  checklistHeaderWrapper: {
    backgroundColor: '#E9F4FB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.grey300,
    borderTopWidth: 1,
    borderTopColor: colors.light.grey300,
    paddingHorizontal: 20,
  },
  checklistHeaderTitle: {
    color: '#000',
    fontSize: fonts.size.medium,
    fontWeight: '500',
  },
  checklistHeaderDesc: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    color: '#000',
  },
});

export {styles};
