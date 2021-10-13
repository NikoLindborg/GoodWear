/**
 * Js-file for modifying users media files
 *
 *
 * Handle user inputs and set them as new media details with
 * modifyMedia from ApiHooks.js
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */
import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Alert} from 'react-native';
import useModifyForm from '../hooks/ModifyHooks';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import ModifyForm from '../components/ModifyForm';

const Modify = ({route}) => {
  const navigation = route.params.navigation;
  const {handleInputChange, inputs, handleInputEnd, modifyErrors, setInputs} =
    useModifyForm();
  const {modifyMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const allData = JSON.parse(route.params.singleMedia.description);

  useEffect(() => {
    (() => {
      setInputs({
        title: route.params.singleMedia.title,
        description: allData.description,
        price: allData.price,
        shipping: allData.shipping,
      });
    })();
  }, []);

  const doModify = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token: ', userToken);
      const descriptionData = {
        description: inputs.description,
        shipping: inputs.shipping,
        price: inputs.price,
      };
      const modifyData = {
        title: inputs.title,
        description: JSON.stringify(descriptionData),
      };
      console.log('modifydataobject', modifyData);
      const result = await modifyMedia(
        modifyData,
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
      }
    } catch (e) {
      console.log('doModify error', e.message);
    }
  };

  return (
    <View>
      <ModifyForm
        title="Modify"
        handleSubmit={doModify}
        handleInputChange={handleInputChange}
        loading={loading}
        handleInputEnd={handleInputEnd}
        modifyErrors={modifyErrors}
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
