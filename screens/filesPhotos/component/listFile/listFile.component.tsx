import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
} from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {CustomModal} from '@src/commons';

import {styles} from './listFile.style';

interface ListFilesProps {
  children: (data: {
    handleSelect: () => void;
    handleSubmit: () => void;
    images: React.ReactNode;
  }) => React.ReactNode;
  onSubmit: (files: Array<DocumentPickerResponse>) => void;
}

const ListFile = ({children, onSubmit}: ListFilesProps) => {
  const [files, setFiles] = React.useState<Array<DocumentPickerResponse>>([]);

  const onRemove = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSelect = () => {
    DocumentPicker.pickMultiple({
      type: ['image/*', 'application/pdf'],
    })
      .then((f: Array<DocumentPickerResponse>) => {
        setFiles(prev => [...prev, ...f]);
      })
      .catch(err => {
        if (DocumentPicker.isCancel(err)) {
          ToastAndroid.show('cancelled!', ToastAndroid.SHORT);
        } else if (isInProgress(err)) {
          ToastAndroid.show(
            'Multiple pickers were opened, only the last will be considered!',
            ToastAndroid.SHORT,
          );
        } else {
          throw err;
        }
      });
  };

  const handleSubmit = () => {
    onSubmit(files);
  };

  const images = (
    <View style={styles.imagesWrapper}>
      {files && files.length > 0 ? (
        files.map((item: DocumentPickerResponse, index: number) => {
          return (
            <View key={index.toString()} style={styles.itemWrapper}>
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => onRemove(index)}>
                <EntypoIcon name="circle-with-cross" size={26} color="#FFF" />
              </TouchableOpacity>

              <ListItem {...item} />
            </View>
          );
        })
      ) : (
        <View>
          <Text>No files</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {children({handleSelect, handleSubmit, images})}
    </View>
  );
};

// MARK: - ListItem
const ListItem = ({name, type, uri}: DocumentPickerResponse) => {
  const TYPE = type?.split('/')[0];

  switch (TYPE) {
    case 'image':
      return <ImageViewer {...{name, uri}} />;
    case 'application':
      return <PdfViewer {...{name, uri}} />;
    default:
      return <></>;
  }
};

// MARK: - ImageViewer
const ImageViewer = ({
  uri,
  name,
}: Pick<DocumentPickerResponse, 'uri' | 'name'>) => (
  <CustomModal
    displayElement={
      <View>
        <Image
          source={{uri}}
          style={styles.image}
          resizeMode="contain"
          resizeMethod="scale"
        />
        <Text
          style={styles.fileNameText}
          numberOfLines={1}
          ellipsizeMode="tail">
          {name}
        </Text>
      </View>
    }>
    {({onCloseModalHandler}) => (
      <View style={styles.customModalWrapper}>
        <Pressable
          onPress={() => onCloseModalHandler()}
          style={styles.customModalCloseButton}>
          <MaterialIcon name="close" size={24} />
        </Pressable>

        <Image
          source={{uri}}
          style={styles.modalImage}
          resizeMode="contain"
          resizeMethod="scale"
        />
      </View>
    )}
  </CustomModal>
);

// MARK: - PdfViewer
const PdfViewer = ({
  uri,
  name,
}: Pick<DocumentPickerResponse, 'uri' | 'name'>) => (
  <CustomModal
    displayElement={
      <View>
        <FontAwesomeIcon name="file-pdf-o" size={150} color={'#EC0F02'} />
        <Text
          style={styles.fileNameText}
          numberOfLines={1}
          ellipsizeMode="tail">
          {name}
        </Text>
      </View>
    }>
    {({onCloseModalHandler}) => (
      <View style={styles.customModalWrapper}>
        <Pressable
          onPress={() => onCloseModalHandler()}
          style={styles.customModalCloseButton}>
          <MaterialIcon name="close" size={24} />
        </Pressable>

        <Pdf source={{uri}} style={styles.pdfContent} />
      </View>
    )}
  </CustomModal>
);

export {ListFile};
