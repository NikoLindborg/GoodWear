import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import {Button} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {StyleSheet} from 'react-native';

const UploadForm = ({
  title,
  handleSubmit,
  handleInputChange,
  loading,
  uploadErrors,
  inputs,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Hats', value: 'hats'},
    {label: 'Jackets', value: 'jackets'},
    {label: 'Pants', value: 'pants'},
    {label: 'Shoes', value: 'shoes'},
    {label: 'Gloves', value: 'gloves'},
    {label: 'Accessories', value: 'accessories'},
    {label: 'Dresses', value: 'dresses'},
    {label: 'Skirts', value: 'skirts'},
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'New/Unworn', value: 'new'},
    {label: 'Good', value: 'good'},
    {label: 'Alright', value: 'alright'},
    {label: 'Bad', value: 'bad'},
  ]);

  return (
    <>
      <FormTextInput
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
        errorMessage={uploadErrors.title}
        value={inputs.title}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={(value) => handleInputChange('category', value)}
        zIndex={3000}
        zIndexInverse={1000}
      />
      <DropDownPicker
        open={open2}
        value={value2}
        items={items2}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setItems2}
        onChangeValue={(value) => handleInputChange('condition', value)}
        zIndex={2000}
        zIndexInverse={2000}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="price"
        onChangeText={(txt) => handleInputChange('price', txt)}
        errorMessage={uploadErrors.price}
        value={inputs.price}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="size"
        onChangeText={(txt) => handleInputChange('size', txt)}
        errorMessage={uploadErrors.size}
        value={inputs.size}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
        errorMessage={uploadErrors.description}
        value={inputs.description}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="shipping"
        onChangeText={(txt) => handleInputChange('shipping', txt)}
        errorMessage={uploadErrors.shipping}
        value={inputs.shipping}
      />
      <Button
        raised
        title={title}
        onPress={handleSubmit}
        loading={loading}
        disabled={
          uploadErrors.title !== null || uploadErrors.description !== null
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  dropDown: {},
});

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
  uploadErrors: PropTypes.object,
};

export default UploadForm;
