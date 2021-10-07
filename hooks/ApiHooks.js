import {useEffect, useState, useContext} from 'react';
import {doFetch} from '../utils/http';
import {appId, baseUrl} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';
import axios from 'axios';

const useMedia = (ownFiles = false) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update, user} = useContext(MainContext);

  useEffect(() => {
    (async () => {
      const array = await loadMedia(appId);
      setMediaArray(array.reverse());
    })();
  }, [update]);

  const loadMedia = async (tag) => {
    try {
      let mediaWithoutThumbnails = await doFetch(baseUrl + 'tags/' + tag);
      if (ownFiles) {
        mediaWithoutThumbnails = mediaWithoutThumbnails.filter(
          (item) => item.user_id === user.user_id
        );
      }
      const allMedia = mediaWithoutThumbnails.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });

      return Promise.all(allMedia);
    } catch (e) {
      console.log('apiHooks loadMedia: ', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const singleMedia = await doFetch(baseUrl + 'media/' + id);
      return singleMedia;
    } catch (e) {
      console.log('loadSingleMedia: ', e.message);
      return {};
    }
  };

  const uploadMedia = async (formData, token) => {
    try {
      // setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        data: formData,
      };
      const result = await axios(baseUrl + 'media/', options);
      console.log('axios', result.data);
      return result.data;
    } catch (e) {
      console.log('uploadmedia', e);
      throw new Error(e.message);
    } finally {
      // setLoading(false);
    }
  };

  return {
    mediaArray,
    loadSingleMedia,
    loadMedia,
    uploadMedia,
  };
};

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
      console.log(response);
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
      console.log('useUser - checkToken', e);
    }
  };

  const checkUserName = async (username) => {
    try {
      const availability = await doFetch(
        baseUrl + 'users/username/' + username
      );
      return availability.available;
    } catch (e) {
      console.log('checkUsername error', e);
    }
  };

  const editUser = async (userInfo, token) => {
    console.log('Apihooks - editUser', userInfo);
    const options = {
      method: 'PUT',
      headers: {'x-access-token': token, 'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo),
    };
    try {
      const response = await doFetch(baseUrl + 'users', options);
      console.log('edituser response', response);
      return response;
    } catch (e) {
      console.log('ApiHooks - editUser', e.message);
      return false;
    }
  };

  return {checkUserName, register, checkToken, editUser};
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

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const tagList = await doFetch(baseUrl + 'tags/' + tag);
      return tagList;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  // eslint-disable-next-line camelcase
  const addTag = async (file_id, tag, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id, tag}),
    };
    try {
      console.log('adding tag');
      const tagResult = await doFetch(baseUrl + 'tags/', options);
      console.log('tagResult', tagResult);
      return tagResult;
    } catch (e) {
      console.log('add tag error ', e.message);
      throw new Error(e.message);
    }
  };

  // eslint-disable-next-line camelcase
  const getPostTags = async (file_id) => {
    try {
      // eslint-disable-next-line camelcase
      const postTagsResult = await doFetch(baseUrl + 'tags/file/' + file_id);
      return postTagsResult;
    } catch (e) {
      console.log('getPtostTags error ', e.message);
      throw new Error(e.message);
    }
  };

  const getListByTag = async (tag) => {
    try {
      const listByTag = await doFetch(baseUrl + 'tags/' + tag);
      return listByTag;
    } catch (e) {
      console.log('listByTag error ', e.message);
      throw new Error(e.message);
    }
  };

  return {getFilesByTag, addTag, getPostTags, getListByTag};
};

export {useUser, useLogin, useMedia, useTag};
