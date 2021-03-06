/**
 * File for useContext
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

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
  const [updateFilter, setUpdateFilter] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [chatSubject, setChatSubject] = useState('');
  const [newWatchlist, setNewWatchlist] = useState(false);
  const [checkedItems, setCheckedItems] = useState(false);
  const {mediaArray} = useMedia();
  const [updateUser, setUpdateUser] = useState(0);
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
        updateFilter,
        setUpdateFilter,
        askLogin,
        setAskLogin,
        chatSubject,
        setChatSubject,
        updateUser,
        setUpdateUser,
        newWatchlist,
        setNewWatchlist,
        checkedItems,
        setCheckedItems,
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
