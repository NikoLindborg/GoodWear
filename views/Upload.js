import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {Alert, View} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Image, Button, Card} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import useUploadForm from '../hooks/UploadHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appId} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';
import {Platform, StyleSheet} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {Keyboard} from 'react-native';
import {ScrollView} from 'react-native';

const Upload = ({navigation}) => {
  const [image, setImage] = useState();
  const {handleInputChange, inputs, handleInputEnd, uploadErrors, reset} =
    useUploadForm();
  const [type, setType] = useState('');
  const {uploadMedia, loading} = useMedia();
  const {addTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);

  const doReset = () => {
    setImage();
    reset();
  };

  const doUpload = async () => {
    const filename = image.uri.split('/').pop();
    const formData = new FormData();
    const fullData = {
      description: inputs.description,
      shipping: inputs.shipping,
    };
    formData.append('file', {uri: image.uri, name: filename, type});
    formData.append('title', inputs.title);
    formData.append('description', JSON.stringify(fullData));
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await uploadMedia(formData, userToken);
      const tagResult = await addTag(result.file_id, appId, userToken);
      const categoryResult = await addTag(
        result.file_id,
        inputs.category,
        userToken
      );
      const conditionResult = await addTag(
        result.file_id,
        inputs.condition,
        userToken
      );
      const sizeResult = await addTag(result.file_id, inputs.size, userToken);
      if (inputs.gender === 'unisex') {
        const menResult = await addTag(result.file_id, 'male', userToken);
        const femaleResult = await addTag(result.file_id, 'female', userToken);
      } else {
        const genderResult = await addTag(
          result.file_id,
          inputs.gender,
          userToken
        );
      }
      const priceResult = await addTag(result.file_id, inputs.price, userToken);
      if (tagResult.message) {
        Alert.alert(
          'Upload',
          result.message,
          [
            {
              text: 'Ok',
              onPress: () => {
                doReset();
                setUpdate(update + 1);
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
      setType(result.type);
    }
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.os === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Card>
              <Image source={image} style={styles.image} />
              <Button title="select media" onPress={pickImage} />
              <UploadForm
                title="Upload"
                handleSubmit={doUpload}
                handleInputChange={handleInputChange}
                loading={loading}
                handleInputEnd={handleInputEnd}
                uploadErrors={uploadErrors}
                image={image}
                inputs={inputs}
              />
              <Button title="Reset" onPress={doReset} />
            </Card>
            <View style={{flex: 1}} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 'auto',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 0,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Upload;
