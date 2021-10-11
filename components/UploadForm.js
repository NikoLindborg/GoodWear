import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import {Button} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

const UploadForm = ({
  title,
  handleSubmit,
  handleInputChange,
  loading,
  uploadErrors,
  inputs,
  value,
  setValue,
  value2,
  setValue2,
  value3,
  setValue3,
  image,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Hats', value: 'hats'},
    {label: 'Jackets', value: 'jackets'},
    {label: 'Hoodies', value: 'hoodies'},
    {label: 'Shirts', value: 'shirts'},
    {label: 'Gloves', value: 'gloves'},
    {label: 'Jeans', value: 'jeans'},
    {label: 'Pants', value: 'pants'},
    {label: 'Shoes', value: 'shoes'},
    {label: 'Dresses', value: 'dresses'},
    {label: 'Skirts', value: 'skirts'},
    {label: 'Accessories', value: 'accessories'},
    {label: 'Other', value: 'other'},
  ]);

  const [open2, setOpen2] = useState(false);
  const [items2, setItems2] = useState([
    {label: 'New/Unworn', value: 'new'},
    {label: 'Good', value: 'good'},
    {label: 'Alright', value: 'alright'},
    {label: 'Bad', value: 'bad'},
  ]);
  const [open3, setOpen3] = useState(false);
  const [items3, setItems3] = useState([
    {label: 'Mens', value: 'male'},
    {label: 'Womens', value: 'female'},
    {label: 'Unisex', value: 'unisex'},
  ]);
  console.log(image);
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
        placeholder={'Select category'}
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
        placeholder={'Select condition'}
        onChangeValue={(value) => handleInputChange('condition', value)}
        zIndex={2000}
        zIndexInverse={2000}
      />
      <DropDownPicker
        open={open3}
        value={value3}
        items={items3}
        setOpen={setOpen3}
        setValue={setValue3}
        setItems={setItems3}
        placeholder={'Select gender'}
        onChangeValue={(value) => handleInputChange('gender', value)}
        zIndex={1000}
        zIndexInverse={3000}
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
          uploadErrors.title !== null ||
          uploadErrors.description !== null ||
          uploadErrors.price !== null ||
          uploadErrors.size !== null ||
          uploadErrors.shipping !== null ||
          uploadErrors.category !== null ||
          uploadErrors.condition !== null ||
          uploadErrors.gender !== null ||
          image === undefined
        }
      />
    </>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
  uploadErrors: PropTypes.object,
  value: PropTypes.string,
  setValue: PropTypes.func,
  value2: PropTypes.string,
  setValue2: PropTypes.func,
  value3: PropTypes.string,
  setValue3: PropTypes.func,
};

export default UploadForm;
