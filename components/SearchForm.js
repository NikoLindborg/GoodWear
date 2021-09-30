import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import FormTextInput from './FormTextInput';
import DropDownPicker from 'react-native-dropdown-picker';

const SearchForm = ({
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
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {label: 'Mens', value: 'male'},
    {label: 'Womens', value: 'female'},
    {label: 'Unisex', value: 'unisex'},
  ]);
  return (
    <>
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
      <DropDownPicker
        open={open3}
        value={value3}
        items={items3}
        setOpen={setOpen3}
        setValue={setValue3}
        setItems={setItems3}
        onChangeValue={(value) => handleInputChange('gender', value)}
        zIndex={1000}
        zIndexInverse={3000}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="size"
        onChangeText={(txt) => handleInputChange('size', txt)}
        value={inputs.size}
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

SearchForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
  uploadErrors: PropTypes.object,
};

export default SearchForm;
