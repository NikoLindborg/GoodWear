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
  loading,
  modifyErrors,
  inputs,
}) => {
  return (
    <>
    <Text>Title</Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
        errorMessage={modifyErrors.title}
        value={inputs.title}
      />
      <Text>Description</Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
        errorMessage={modifyErrors.description}
        value={inputs.description}
      />
      <Text>Shipping</Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="shipping"
        onChangeText={(txt) => handleInputChange('shipping', txt)}
        errorMessage={modifyErrors.shipping}
        value={inputs.shipping}
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
  loading: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
  modifyErrors: PropTypes.object,
};

export default ModifyForm;
