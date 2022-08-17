import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  eventInfoButtonWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  eventInfoButton: {
    paddingVertical: 12,
    backgroundColor: '#33CD5F',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: '80%',
  },
  eventInfoButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
  eventInfoButtonRight: {
    backgroundColor: '#33CD5F',
    width: '20%',
    borderLeftWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export {styles};
