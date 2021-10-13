import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'react-native-elements';
import fontStyles from '../utils/fontStyles';

const FormTextInput = ({style, ...otherProps}) => {
  return (
    <Input
      {...otherProps}
      style={fontStyles.regularFont}
      labelStyle={fontStyles.boldBlackFont}
    />
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
