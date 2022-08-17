import {StyleSheet} from 'react-native';

import {colors, fonts} from '@src/modules';

const styles = StyleSheet.create({
  jobListHeader: {
    backgroundColor: '#E9F4FB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.light.grey300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobListHeaderText: {
    color: '#000',
    fontSize: fonts.size.medium,
    fontWeight: 'bold',
  },
  jobListHeaderChip: {
    marginLeft: 10,
    backgroundColor: colors.light.black200,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  jobListHeaderChipText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: fonts.size.medium,
  },
  signOffWrapper: {
    paddingHorizontal: 20,
    backgroundColor: colors.light.white,
  },
  signOffCardContainer: {
    paddingVertical: 10,
  },
  headerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  dateText: {
    color: colors.light.disabledPrimaryColor,
    fontSize: fonts.size.small,
  },
  chipText: {
    color: '#FFF',
    fontSize: fonts.size.small,
  },
  jobSignedWrapper: {},
  jobSigned: {
    color: '#000',
    fontSize: fonts.size.large,
    fontWeight: 'bold',
  },
  jobTypeWrapper: {
    paddingVertical: 2,
    marginBottom: 4,
  },
  jobType: {
    fontSize: fonts.size.small,
    color: colors.light.black200,
  },
});

export {styles};
