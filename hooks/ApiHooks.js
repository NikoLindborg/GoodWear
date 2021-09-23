import {useEffect, useState, useContext} from 'react';
import {doFetch} from '../utils/http';
import {appId, baseUrl} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';

const useUser = () => {
  const register = async (inputs) => {
    const registerInputs = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      full_name: inputs.full_name,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerInputs),
    };
    try {
      const response = await doFetch(baseUrl + 'users', fetchOptions);
      console.log(response)
      return response;
    } catch (e) {
      console.log('ApiHooks register', e.message);
      return false;
    }
  };

  const checkToken = async (token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const userInfo = await doFetch(baseUrl + 'users/user', options);
      return userInfo;
    } catch (e) {
      console.log('useUser', e);
    }
  };

  const checkUserName = async (username) => {
    try {
      const availability = await doFetch(
        baseUrl + 'users/username/' + username
      );
      return availability;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {checkUserName, register, checkToken};
};

const useLogin = () => {
  const login = async (userCredentials) => {
    const options = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': ' application/json',
      },
      body: userCredentials,
    };
    try {
      const loginResponse = await doFetch(baseUrl + 'login/', options);
      return loginResponse;
    } catch (e) {
      console.log('login error', e);
    }
  };
  return {login};
};

export {useUser, useLogin};
