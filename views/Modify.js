import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Alert} from 'react-native';
import UploadForm from '../components/UploadForm';
import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Modify = ({route}) => {
  const navigation = route.params.navigation;
  const {handleInputChange, inputs, handleInputEnd, uploadErrors, setInputs} =
    useUploadForm();
  const {modifyMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  useEffect(() => {
    (() => {
      setInputs({
        title: route.params.singleMedia.title,
        description: route.params.singleMedia.description,
      });
    })();
  }, []);

  doModify();
  const doModify = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const data = {description: inputs.description, shipping: inputs.shipping};
      console.log('doModify', data);
      /* const result = await modifyMedia(
        inputs,
        userToken,
        route.params.singleMedia.file_id
      );
      if (result.message) {
        Alert.alert(
          'Modify',
          result.message,
          [
            {
              text: 'Ok',
              onPress: () => {
                setUpdate(update + 1);
                navigation.navigate('Profile');
              },
            },
          ],
          {cancelable: false}
        );
      } */
    } catch (e) {
      console.log('doModify error', e.message);
    }
  };

  return (
    <View>
      <UploadForm
        title="Upload"
        handleSubmit={doModify}
        handleInputChange={handleInputChange}
        loading={loading}
        handleInputEnd={handleInputEnd}
        uploadErrors={uploadErrors}
        inputs={inputs}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
};

Modify.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Modify;
