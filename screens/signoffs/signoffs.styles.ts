import {colors, spacing} from '@src/modules';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},
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
});

export {styles};
