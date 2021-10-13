/**
 * Js-file for hooks in search.js.
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import {useState} from 'react';

const useSearchForm = () => {
  const [filters, setFilters] = useState({});

  const handleInputChange = (name, text) => {
    setFilters((inputs) => {
      return {
        ...filters,
        [name]: text,
      };
    });
  };

  return {
    filters,
    handleInputChange,
  };
};

export default useSearchForm;
