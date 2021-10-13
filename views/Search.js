/**
 * Js-file for search screen.
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {Keyboard} from 'react-native';
import {View} from 'react-native';
import SearchForm from '../components/SearchForm';
import useSearchForm from '../hooks/SearchHooks';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import fontStyles from '../utils/fontStyles';

const Search = ({navigation}) => {
  const {handleInputChange, filters} = useSearchForm();
  const {update, setUpdate} = useContext(MainContext);
  const {mediaArray, loadMedia} = useMedia();

  const doSearch = async () => {
    setUpdate(update + 1);

    // here we just make a list and iterate over each one
    let filteredList;
    if (filters.category) {
      const categoryList = await loadMedia(filters.category);

      const listGettingFiltered = mediaArray.filter((el) => {
        // here we make sure theres only objects that are related to the appId, because of a shared backend
        return categoryList.some((f) => {
          return f.file_id === el.file_id;
        });
      });
      filteredList = listGettingFiltered;
    }

    if (filters.condition) {
      const conditionList = await loadMedia(filters.condition);
      // here we make sure theres only objects that are related to the appId, because of a shared backend
      const listGettingFiltered = mediaArray.filter((el) => {
        return conditionList.some((f) => {
          return f.file_id === el.file_id;
        });
      });
      if (filters.category) {
        for (let i = 0; i < filteredList.length; i++) {
          if (!listGettingFiltered.includes(filteredList[i]))
            // here we remove any duplicates
            filteredList.splice(listGettingFiltered[i], 1);
        }
      } else {
        filteredList = listGettingFiltered;
      }
    }

    if (filters.gender) {
      const categoryList = await loadMedia(filters.gender);
      const listGettingFiltered = mediaArray.filter((el) => {
        // here we make sure theres only objects that are related to the appId, because of a shared backend
        return categoryList.some((f) => {
          return f.file_id === el.file_id;
        });
      });
      if (filters.category || filters.condition) {
        for (let i = 0; i < filteredList.length; i++) {
          if (!listGettingFiltered.includes(filteredList[i]))
            // here we remove any duplicates
            filteredList.splice(listGettingFiltered[i], 1);
        }
      } else {
        filteredList = listGettingFiltered;
      }
    }

    if (filters.size) {
      const sizeList = await loadMedia(filters.size);
      const listGettingFiltered = mediaArray.filter((el) => {
        // here we make sure theres only objects that are related to the appId, because of a shared backend
        return sizeList.some((f) => {
          return f.file_id === el.file_id;
        });
      });
      if (filters.category || filters.condition || filters.gender) {
        for (let i = 0; i < filteredList.length; i++) {
          if (!listGettingFiltered.includes(filteredList[i]))
            // here we remove any duplicates
            filteredList.splice(listGettingFiltered[i], 1);
        }
      } else {
        filteredList = listGettingFiltered;
      }
    }
    // and finally, when the list is done, we pass it into filteredView
    navigation.navigate('FilteredView', {
      data: {filteredList},
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.os === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <View style={styles.textContainer}>
        <Text style={fontStyles.bigBoldFont}>Search to find your GoodWear</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SearchForm
            title={'Search'}
            handleInputChange={handleInputChange}
            handleSubmit={doSearch}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 8,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
