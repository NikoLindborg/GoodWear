import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'react-native-elements';

const FormTextInput = ({style, ...otherProps}) => {
  return <Input {...otherProps} />;
};

FormTextInput.propTypes = {};

export default FormTextInput;
