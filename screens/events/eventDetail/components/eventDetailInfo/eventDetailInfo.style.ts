import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  eventWrapper: {},
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
  logoLabel: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    maxWidth: '100%',
  },
  logo: {},
  labelWrapper: {
    marginTop: 5,
    paddingHorizontal: 10,
    maxWidth: '100%',
  },
  labelTop: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
    maxWidth: '100%',
  },
  labelBottom: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  eventChip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '50%',
  },
  chipText: {
    fontSize: 12,
    margin: 3,
    backgroundColor: '#F7F8F7',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D9DAD9',
    padding: 5,
    fontWeight: '500',
  },
  eventDescription: {},
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  eventDetail: {},
  locationInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  locationInfoLabel: {
    fontWeight: '500',
    color: '#000',
  },
  locationInfoUser: {
    flexDirection: 'row',
    flex: 1,
  },
  locationInfoLabelWrapper: {
    marginLeft: 10,
    flex: 1,
  },
  markerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
