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
  email: {
    presence: {
      message: 'cannot be empty',
    },
    email: {
      message: 'is not valid',
    },
  },
  full_name: {
    length: {
      minimum: 5,
      message: 'min length is 5 characters',
    },
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
