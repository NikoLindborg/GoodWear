import {useState} from 'react';
import {useUser} from './ApiHooks';
import {validator} from '../utils/validator';

const constraints = {
  username: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  email: {
    presence: true,
    email: {
      message: 'is not valid',
    },
  },
};

const useEditForm = (callback) => {
  const {checkUserName} = useUser();
  const [inputs, setInputs] = useState({});

  const [errors, setErrors] = useState({});

  const handleInputEnd = (name, text) => {
    let error;
    error = validator(name, text, constraints);
    setErrors((errors) => {
      return {
        ...errors,
        [name]: error,
      };
    });
  };

  const handleInputChange = (name, text) => {
    let error;
    error = validator(name, text, constraints);
    setErrors((errors) => {
      return {
        ...errors,
        [name]: error,
      };
    });
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const checkUsernameAvailable = async (text) => {
    if (text.length < 3) {
      return;
    }
    try {
      const isAvailable = await checkUserName(text);
      if (!isAvailable) {
        setErrors((errors) => {
          return {
            ...errors,
            username: 'Username already exists',
          };
        });
      }
    } catch (e) {
      console.error('username check failed', e);
    }
  };

  return {
    handleInputChange,
    inputs,
    checkUsernameAvailable,
    errors,
    handleInputEnd,
  };
};

export default useEditForm;
