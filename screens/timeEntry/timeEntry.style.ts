import {colors, spacing} from '@src/modules';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.white,
    elevation: 1,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  whiteColor: {
    color: 'white',
  },
  chip: {
    fontWeight: '700',
  },
  bold: {
    fontWeight: '700',
  },
  blackColor: {
    color: colors.light.black200,
  },
  width50: {
    width: '50%',
  },
  width100: {
    width: '100%',
  },

  topheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.card.PADDING,
    backgroundColor: colors.light.primaryColor,
    color: colors.light.white,
  },
  whitetext: {
    color: colors.light.white,
  },
  body: {
    width: width,
  },
  avatar: {
    backgroundColor: colors.light.black200,
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  bodytop: {
    paddingHorizontal: spacing.card.PADDING,
    paddingVertical: spacing.card.PADDING / 2,
    borderColor: colors.light.grey300,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.light.primary100,
    marginTop: 1,
  },
  itemWrapper: {
    padding: spacing.screen.PADDING,
    borderBottomColor: colors.light.grey300,
    borderBottomWidth: 1,
  },
});

export {styles};
