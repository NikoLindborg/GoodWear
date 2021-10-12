import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 2,
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
  size: {
    presence: {
      message: 'Cannot be empty.',
    },
  },
  shipping: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 2,
      message: 'min length is 2 characters',
    },
  },
  category: {
    presence: {
      message: 'Cannot be empty.',
    },
  },
  condition: {
    presence: {
      message: 'Cannot be empty.',
    },
  },
  gender: {
    presence: {
      message: 'Cannot be empty.',
    },
  },
};
const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    description: '',
    title: '',
  });
  const [uploadErrors, setUploadErrors] = useState({});
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
    const error = validator(name, text, constraints);
    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        [name]: error,
      };
    });
  };
  const reset = () => {
    setInputs({
      title: '',
      description: '',
    });
    setUploadErrors({});
    setValue(null);
    setValue2(null);
    setValue3(null);
  };
  return {
    handleInputChange,
    inputs,
    setInputs,
    uploadErrors,
    reset,
    value,
    setValue,
    value2,
    setValue2,
    value3,
    setValue3,
  };
};

export default useUploadForm;
