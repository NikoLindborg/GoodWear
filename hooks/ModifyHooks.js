import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  description: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
};
const useModifyForm = (callback) => {
  const [inputs, setInputs] = useState({
    description: '',
    title: '',
  });
  const [modifyErrors, setModifyErrors] = useState({});

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
    const error = validator(name, text, constraints);
    setModifyErrors((modifyErrors) => {
      return {
        ...modifyErrors,
        [name]: error,
      };
    });
  };
  const reset = () => {
    setInputs({
      title: '',
      description: '',
    });
    setModifyErrors({});
  };
  return {
    handleInputChange,
    inputs,
    setInputs,
    modifyErrors,
    reset,
  };
};

export default useModifyForm;
