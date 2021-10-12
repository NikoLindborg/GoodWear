import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [askLogin, setAskLogin] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);
  const [updateFavourite, setUpdateFavourite] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [loading, setLoading] = useState(false);
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
        askLogin,
        setAskLogin,
        loading,
        setLoading,
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
