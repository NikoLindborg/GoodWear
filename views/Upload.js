/**
 * Js-file for upload screen.
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {Alert, View, Keyboard} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Image, Button, Card, Text} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import useUploadForm from '../hooks/UploadHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appId} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';
import {Platform, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import fontStyles from '../utils/fontStyles';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(
    require('../assets/GW_graphics_slogan.png')
  );
  const {
    handleInputChange,
    inputs,
    handleInputEnd,
    uploadErrors,
    reset,
    value,
    setValue,
    value2,
    setValue2,
    value3,
    setValue3,
  } = useUploadForm();
  const {uploadMedia, loadingMedia} = useMedia();
  const {addTag} = useTag();
  const {update, setUpdate, isLoggedIn, setAskLogin} = useContext(MainContext);

  const doReset = () => {
    setImage();
    reset();
  };

  const doUpload = async () => {
    // here we check the images filetype, this is done this way because of android
    const filename = image.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    if (type === 'image/jpg') type = 'image/jpeg';
    const formData = new FormData();
    const fullData = {
      description: inputs.description,
      shipping: inputs.shipping,
      price: inputs.price,
    };
    formData.append('file', {uri: image.uri, name: filename, type});
    formData.append('title', inputs.title);
    formData.append('description', JSON.stringify(fullData));
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await uploadMedia(formData, userToken);
      const tagResult = await addTag(result.file_id, appId, userToken);
      // first we upload the file, then we add the appId tag into it, after which we add all the tags
      // related to the post
      await addTag(result.file_id, inputs.category, userToken);
      await addTag(result.file_id, inputs.condition, userToken);
      await addTag(result.file_id, inputs.size, userToken);
      if (inputs.gender === 'unisex') {
        await addTag(result.file_id, 'male', userToken);
        await addTag(result.file_id, 'female', userToken);
      } else {
        await addTag(result.file_id, inputs.gender, userToken);
      }
      setUpdate(update + 1);
      if (tagResult.message && !loadingMedia) {
        Alert.alert(
          'Upload',
          result.message,
          [
            {
              text: 'Ok',
              onPress: () => {
                doReset();
                navigation.navigate('Front');
              },
            },
          ],
          {cancelable: false}
        );
      }
    } catch (e) {
      console.log('do upload error', e.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage({uri: result.uri});
    }
  };
  return (
    <KeyboardAwareScrollView
      behavior={Platform.os === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
      extraScrollHeight={100}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {!isLoggedIn ? (
          <View style={styles.introBox}>
            <Text style={styles.headerFont}>
              {'\n'}Hello!{'\n'}
            </Text>
            <Text style={fontStyles.regularFontCenter}>
              As a non registered user, you can only browse items{'\n'}
            </Text>
            <Text style={fontStyles.regularFontCenter}>
              You can go back to login screen by clicking the button down below
              {'\n'}
            </Text>
            <Button
              buttonStyle={styles.buttonWhite}
              titleStyle={fontStyles.boldBlackFont}
              title={'Go back to login'}
              onPress={() => {
                setAskLogin(false);
              }}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Card>
              <Image source={image} style={styles.image} />
              <Button
                title="Select media"
                buttonStyle={styles.redButton}
                titleStyle={fontStyles.boldFont}
                onPress={pickImage}
              />
              <UploadForm
                title="Upload"
                handleSubmit={doUpload}
                handleInputChange={handleInputChange}
                loading={loadingMedia}
                handleInputEnd={handleInputEnd}
                uploadErrors={uploadErrors}
                image={image}
                inputs={inputs}
                value={value}
                setValue={setValue}
                value2={value2}
                setValue2={setValue2}
                value3={value3}
                setValue3={setValue3}
              />
              <Button
                title="Reset"
                buttonStyle={styles.buttonWhite}
                titleStyle={fontStyles.boldBlackFont}
                onPress={doReset}
              />
            </Card>
            <View style={{flex: 1}} />
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 'auto',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 0,
  },
  introBox: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonWhite: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  redButton: {
    backgroundColor: '#E07A5F',
    marginBottom: 10,
  },
  headerFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Upload;
