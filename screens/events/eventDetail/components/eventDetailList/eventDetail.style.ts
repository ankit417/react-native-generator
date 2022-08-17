import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {paddingVertical: 10},
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    alignItems: 'center',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export {styles};
