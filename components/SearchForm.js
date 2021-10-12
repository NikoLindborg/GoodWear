import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import fontStyles from '../utils/fontStyles';

const SearchForm = ({title, handleSubmit, handleInputChange, loading}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
        style={{borderColor: 'white'}}
        placeholder={'Select category'}
        textStyle={fontStyles.regularFont}
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
        textStyle={fontStyles.regularFont}
        style={{borderColor: 'white'}}
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
        style={{borderColor: 'white'}}
        textStyle={fontStyles.regularFont}
        onChangeValue={(value) => handleInputChange('gender', value)}
        zIndex={1000}
        zIndexInverse={3000}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Size"
        onChangeText={(txt) => handleInputChange('size', txt)}
      />

      <Button
        buttonStyle={styles.redButton}
        titleStyle={fontStyles.boldFont}
        title={title}
        onPress={handleSubmit}
        loading={loading}
      />
    </>
  );
};
SearchForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  uploadErrors: PropTypes.object,
};

const styles = StyleSheet.create({
  buttonWhite: {
    marginTop: 5,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  redButton: {
    marginTop: 5,
    backgroundColor: '#E07A5F',
  },
});

export default SearchForm;
