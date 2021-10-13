/**
 * Js-file for login screens registerForm hooks.
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import {useState} from 'react';
import {useUser} from './ApiHooks';
import {validator} from '../utils/validator';

// constraints for validator
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
  password: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 5,
      message: 'min length is 5 characters',
    },
  },
  confirmPassword: {
    equality: 'password',
  },
  from: {
    email: true,
  },
};

const useSignUpForm = () => {
  const {checkUserName} = useUser();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const [registerErrors, setRegisterErrors] = useState({});

  const handleInputEnd = (name, text, input) => {
    // when input ends, check input for validator
    if (text === '') {
      text = null;
      return;
    }
    let error;
    if (name === 'confirmPassword') {
      error = validator(
        name,
        {
          password: input.password,
          confirmPassword: text,
        },
        constraints
      );
    } else {
      error = validator(name, text, constraints);
    }
    setRegisterErrors((registerErrors) => {
      return {
        ...registerErrors,
        [name]: error,
      };
    });
  };

  const handleInputChange = (name, text, input) => {
    setInputs((input) => {
      return {
        ...input,
        [name]: text,
      };
    });
    let error;
    if (name === 'confirmPassword') {
      error = validator(
        name,
        {
          password: input.password,
          confirmPassword: text,
        },
        constraints
      );
    } else {
      error = validator(name, text, constraints);
    }
    setRegisterErrors((registerErrors) => {
      return {
        ...registerErrors,
        [name]: error,
      };
    });
  };

  const checkUserAvailable = async (text) => {
    // check if there is already user with the name that the user is trying to choose
    if (text.length < 3) {
      return;
    }
    try {
      const result = await checkUserName(text);
      if (!result.available) {
        setRegisterErrors((registerErrors) => {
          return {
            ...registerErrors,
            username: 'Username already exists',
          };
        });
      } else {
        setRegisterErrors((registerErrors) => {
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
    registerErrors,
    handleInputEnd,
  };
};

export default useSignUpForm;
