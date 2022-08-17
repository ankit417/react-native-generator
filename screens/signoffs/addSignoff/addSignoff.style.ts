import {StyleSheet} from 'react-native';
import {colors, fonts} from '@src/modules';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    paddingVertical: 20,
  },
  userForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: fonts.size.large,
    marginBottom: 4,
  },
  sectionText: {
    marginTop: 10,
  },
  signatureWrapper: {
    height: 200,
    borderWidth: 1,
    borderColor: colors.light.grey300,
    borderRadius: 6,
  },
  signatureActionButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
});

export {styles};
