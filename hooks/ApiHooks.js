import {appId, baseUrl} from '../utils/variables';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {doFetch} from '../utils/http';

const useMedia = (ownFiles = false) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      const mediaWithoutThumbnails = await doFetch(baseUrl + 'tags/' + appId);
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

  return {
    mediaArray,
    loadSingleMedia,
    loadMedia,
  };
};

export {useMedia};
