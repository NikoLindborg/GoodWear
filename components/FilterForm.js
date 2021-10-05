import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {StyleSheet} from 'react-native';
import useFilterForm from '../hooks/FilterHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';

const FilterForm = () => {
  const {inputs, handleInputChange} = useFilterForm();
  const {editUser} = useUser();
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

  const addFilteredItems = async (inputs) => {
    const filteredItems = {
      full_name: 'testi',
      items: inputs.category,
    };
    const data = {full_name: JSON.stringify(filteredItems)};
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const result = await editUser(data, userToken);
        console.log('filterform - addfiltered items', result);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        multiple={true}
        min={0}
        max={10}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={(value) => handleInputChange('category', value)}
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Button
        raised
        title="Add filters"
        onPress={() => {
          addFilteredItems(inputs);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dropDown: {},
});

FilterForm.propTypes = {};

export default FilterForm;
