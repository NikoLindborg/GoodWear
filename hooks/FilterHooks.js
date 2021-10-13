import {useState} from 'react';

const useFilterForm = (callback) => {
  const [inputs, setInputs] = useState({});
  const [value, setValue] = useState(null);

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  return {
    handleInputChange,
    inputs,
    value,
    setValue,
  };
};

export default useFilterForm;
