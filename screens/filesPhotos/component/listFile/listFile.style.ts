import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '@src/modules';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
  imagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  fileNameText: {
    maxWidth: 150,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.light.grey200,
  },
  customModalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  customModalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  pdfContent: {
    flex: 1,
    width,
    height: height * 0.9,
  },
  modalImage: {
    width: width,
    height: height * 0.8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  itemWrapper: {
    marginVertical: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: '#929292',
    borderRadius: 50,
  },
});

export {styles};
