/**
 * Js-file for api calls
 *
 *
 * UseMedia() for uploading, modifying and deleting media,
 * also loads mediaArray which contains either all media or users own media
 *
 * UseUser() for register, checkToken ( loads userdata ),
 * editUser and checkUsername function
 *
 * UseLogin() for handling login.
 *
 * UseTag() for loading all tags / tags by tag / tags by file_id,
 * and adding tags
 *
 * UseFavourite() for loading list of favourites,
 * adding and deleting favourites
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */
import {useEffect, useState, useContext} from 'react';
import {doFetch} from '../utils/http';
import {appId, baseUrl} from '../utils/variables';
import {MainContext} from '../contexts/MainContext';

const useMedia = (ownFiles = false) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update, user, setNewWatchlist} = useContext(MainContext);
  const [loadingMedia, setLoadingMedia] = useState();

  useEffect(() => {
    (async () => {
      setLoadingMedia(true);
      const array = await loadMedia(appId);
      setMediaArray(array.reverse());
      setLoadingMedia(false);
      setNewWatchlist(true);
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
        body: formData,
      };
      const result = await doFetch(baseUrl + 'media/', options);
      return result;
    } catch (e) {
      console.log('uploadmedia', e);
      throw new Error(e.message);
    } finally {
      // setLoading(false);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('deleteMedia error', e);
      throw new Error(e.message);
    }
  };

  const modifyMedia = async (data, token, id) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('modifyMedia error', e);
      throw new Error(e.message);
    }
  };

  return {
    mediaArray,
    loadSingleMedia,
    loadMedia,
    uploadMedia,
    deleteMedia,
    modifyMedia,
    loadingMedia,
  };
};

const useUser = () => {
  const register = async (inputs) => {
    const registerInputs = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
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
    const options = {
      method: 'PUT',
      headers: {'x-access-token': token, 'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo),
    };
    try {
      const response = await doFetch(baseUrl + 'users', options);
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
      const tagResult = await doFetch(baseUrl + 'tags/', options);
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

const useFavourite = () => {
  // eslint-disable-next-line camelcase
  const loadFavourites = async (token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const result = await doFetch(baseUrl + 'favourites', options);
      return result;
    } catch (e) {
      console.log('get favourites error ', e.message);
      throw new Error(e.message);
    }
  };

  // eslint-disable-next-line camelcase
  const addFavourite = async (file_id, token) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({file_id: file_id}),
      };
      const result = await doFetch(baseUrl + 'favourites', options);
      return result;
    } catch (e) {
      console.log('add favourite error ', e.message);
      throw new Error(e.message);
    }
  };

  // eslint-disable-next-line camelcase
  const deleteFavourite = async (file_id, token) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      };
      const result = await doFetch(
        // eslint-disable-next-line camelcase
        baseUrl + 'favourites/file/' + file_id,
        options
      );
      return result;
    } catch (e) {
      console.log('delete favourite error ', e.message);
      throw new Error(e.message);
    }
  };

  return {loadFavourites, addFavourite, deleteFavourite};
};
export {useUser, useLogin, useMedia, useTag, useFavourite};
