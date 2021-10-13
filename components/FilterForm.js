/**
 * Form component used for creating watchlist in profile
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import PropTypes from 'prop-types';
import fontStyles from '../utils/fontStyles';

const FilterForm = ({handleInputChange, value, setValue}) => {
  // states needed for the dropdown picker
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
        style={{borderColor: 'white', marginBottom: 10}}
        textStyle={fontStyles.regularFont}
        onChangeValue={(value) => handleInputChange('category', value)}
        selectedItemContainerStyle={{
          backgroundColor: '#E07A5F',
        }}
      />
    </>
  );
};

FilterForm.propTypes = {
  handleInputChange: PropTypes.func,
  inputs: PropTypes.object,
  value: PropTypes.array,
  setValue: PropTypes.func,
};

export default FilterForm;
