import React, {useContext, useState} from 'react';
import {Button} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import useFilterForm from '../hooks/FilterHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const FilterForm = () => {
  const {setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useFilterForm();
  const {editUser} = useUser();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Gender - Male', value: 'male'},
    {label: 'Gender - Female', value: 'female'},
    {label: 'Hats', value: 'hats'},
    {label: 'Jackets', value: 'jackets'},
    {label: 'Pants', value: 'pants'},
    {label: 'Shoes', value: 'shoes'},
    {label: 'Gloves', value: 'gloves'},
    {label: 'Accessories', value: 'accessories'},
    {label: 'Dresses', value: 'dresses'},
    {label: 'Skirts', value: 'skirts'},
  ]);

  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
        }
      } catch (e) {
        console.log('getToken filterform', e);
      }
    }
  };

  const addFilteredItems = async (inputs) => {
    const filteredItems = {
      items: inputs.category,
    };
    const data = {full_name: JSON.stringify(filteredItems)};
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const result = await editUser(data, userToken);
        if (result) {
          setUser(data);
          getToken();
        } else {
          console.log('Add filters failed');
        }
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
        selectedItemContainerStyle={{
          backgroundColor: '#E07A5F',
        }}
        onChangeValue={(value) => handleInputChange('category', value)}
      />

      <Button
        title="Set filters"
        onPress={() => {
          addFilteredItems(inputs);
        }}
      />
    </>
  );
};

FilterForm.propTypes = {};

export default FilterForm;
