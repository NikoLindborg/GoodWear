/**
 * FontStyle variables for the App. Styles are exported so they can be used everywhere
 *
 * @author Aleksi Kosonen, Niko Lindborg & Aleksi Kytö
 *
 **/

import {StyleSheet} from 'react-native';

const fontStyles = StyleSheet.create({
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
