import {useState} from 'react';

const useFilterForm = (callback) => {
  const [inputs, setInputs] = useState({});

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
  };
};

export default useFilterForm;
