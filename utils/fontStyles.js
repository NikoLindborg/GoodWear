import {StyleSheet} from 'react-native';

const fontStyles = StyleSheet.create({
  // FONTS
  regularFont: {
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 16,
  },
  regularFontCenter: {
    fontFamily: 'RobotoCondensed_400Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  boldFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 18,
  },
  boldFontHeader: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 16,
  },
  boldBlackFont: {
    color: 'black',
    fontFamily: 'RobotoCondensed_700Bold',
  },
  regularBlackFont: {
    color: 'black',
    fontFamily: 'RobotoCondensed_400Regular',
  },
  bigBoldFont: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 22,
  },
  bigBoldFont24: {
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 24,
  },
});

export default fontStyles;
