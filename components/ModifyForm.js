/**
 * Js-file for user settings in profile
 *
 *
 * Form for editing media details to user, handles inputs and send them forward
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import {Button, Text} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {StyleSheet} from 'react-native';

const ModifyForm = ({
  title,
  handleSubmit,
  handleInputChange,
  handleInputEnd,
  loading,
  modifyErrors,
  inputs,
}) => {
  modifyErrors.title = null;
  modifyErrors.price = null;
  modifyErrors.description = null;
  modifyErrors.shipping = null;
  return (
    <>
      <Text>Title</Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
        errorMessage={modifyErrors.title}
        value={inputs.title}
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          handleInputEnd('title', text, inputs);
        }}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="price"
        onChangeText={(txt) => handleInputChange('price', txt)}
        errorMessage={modifyErrors.price}
        value={inputs.price}
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          handleInputEnd('price', text, inputs);
        }}
      />
      <Text>Description</Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
        errorMessage={modifyErrors.description}
        value={inputs.description}
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          handleInputEnd('description', text, inputs);
        }}
      />
      <Text>Shipping</Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="shipping"
        onChangeText={(txt) => handleInputChange('shipping', txt)}
        errorMessage={modifyErrors.shipping}
        value={inputs.shipping}
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          handleInputEnd('shipping', text, inputs);
        }}
      />
      <Button
        raised
        title={title}
        onPress={handleSubmit}
        loading={loading}
        disabled={
          modifyErrors.title !== null || modifyErrors.description !== null
        }
      />
    </>
  );
};

ModifyForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputEnd: PropTypes.func,
  loading: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
  modifyErrors: PropTypes.object,
};

export default ModifyForm;
