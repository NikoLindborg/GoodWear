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
  price: {
    presence: {
      message: 'Cannot be empty.',
    },
    format: {
      pattern: '[0-9]+',
      message: 'can only contain numbers',
    },
  },
  shipping: {
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

  const handleInputEnd = (name, text, input) => {
    if (text === '') {
      text = null;
      return;
    }
    let error;
    error = validator(name, text, constraints);
    setModifyErrors((modifyErrors) => {
      return {
        ...modifyErrors,
        [name]: error,
      };
    });
  };

  return {
    handleInputChange,
    inputs,
    setInputs,
    modifyErrors,
    handleInputEnd,
  };
};

export default useModifyForm;
