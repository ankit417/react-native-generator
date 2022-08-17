import {colors, fonts, spacing} from '@src/modules';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemWrapper: {
    padding: spacing.screen.PADDING,
    borderBottomColor: colors.light.grey300,
    borderBottomWidth: 1,
  },
  flexWrap: {flexWrap: 'wrap'},
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: fonts.size.large,
    color: '#000',
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  whiteColor: {
    color: 'white',
  },
  chip: {
    fontSize: fonts.size.small,
  },
  bold: {
    fontWeight: 'bold',
  },
  blackColor: {
    color: colors.light.black200,
  },
  width50: {
    width: '50%',
  },
});

export {styles};
