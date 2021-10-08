import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);
  const [updateFavourite, setUpdateFavourite] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const {mediaArray} = useMedia();
  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        update,
        setUpdate,
        mediaArray,
        updateFavourite,
        setUpdateFavourite,
        unreadMessages,
        setUnreadMessages,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
