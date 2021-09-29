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
    presence: {
      message: 'cannot be empty',
    },
    email: {
      message: 'is not valid',
    },
  },
};

const useEditForm = (callback) => {
  const {checkUserName} = useUser();
  const [inputs, setInputs] = useState({});

  const [editErrors, setEditErrors] = useState({});

  const handleInputEnd = (name, text, input) => {
    if (text === '') {
      text = null;
      return;
    }
    let error;

    setEditErrors((editErrors) => {
      return {
        ...editErrors,
        [name]: error,
      };
    });
  };

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const checkUserAvailable = async (text) => {
    if (text.length < 3) {
      return;
    }
    try {
      const result = await checkUserName(text);
      if (!result.available) {
        setEditErrors((registerErrors) => {
          return {
            ...registerErrors,
            username: 'Username already exists',
          };
        });
      } else {
        setEditErrors((registerErrors) => {
          return {
            ...registerErrors,
            username: null,
          };
        });
      }
    } catch (error) {
      console.error('reg checkUserAvailable', error);
    }
  };

  return {
    handleInputChange,
    inputs,
    checkUserAvailable,
    editErrors,
    handleInputEnd,
  };
};

export default useEditForm;
