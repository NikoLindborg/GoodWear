import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
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

const Search = ({navigation}) => {
  const {handleInputChange, filters} = useSearchForm();
  const {update, setUpdate} = useContext(MainContext);
  const {mediaArray, loadMedia} = useMedia();

  const doSearch = async () => {
    setUpdate(update + 1);

    let filteredList;

    if (filters.category) {
      const categoryList = await loadMedia(filters.category);

      const listGettingFiltered = mediaArray.filter((el) => {
        return categoryList.some((f) => {
          return f.file_id === el.file_id;
        });
      });
      filteredList = listGettingFiltered;
      console.log(filteredList);
    }

    if (filters.condition) {
      const conditionList = await loadMedia(filters.condition);

      const listGettingFiltered = mediaArray.filter((el) => {
        return conditionList.some((f) => {
          return f.file_id === el.file_id;
        });
      });
      if (filters.category) {
        for (let i = 0; i < filteredList.length; i++) {
          if (!listGettingFiltered.includes(filteredList[i]))
            filteredList.splice(listGettingFiltered[i], 1);
        }
      } else {
        filteredList = listGettingFiltered;
      }
      console.log('distinct ', filteredList);
    }

    if (filters.gender) {
      const categoryList = await loadMedia(filters.gender);
      const listGettingFiltered = mediaArray.filter((el) => {
        return categoryList.some((f) => {
          return f.file_id === el.file_id;
        });
      });
      if (filters.category || filters.condition) {
        for (let i = 0; i < filteredList.length; i++) {
          if (!listGettingFiltered.includes(filteredList[i]))
            filteredList.splice(listGettingFiltered[i], 1);
        }
      } else {
        filteredList = listGettingFiltered;
      }
    }

    if (filters.size) {
      const sizeList = await loadMedia(filters.size);
      const listGettingFiltered = mediaArray.filter((el) => {
        return sizeList.some((f) => {
          return f.file_id === el.file_id;
        });
      });
      if (filters.category || filters.condition || filters.gender) {
        for (let i = 0; i < filteredList.length; i++) {
          if (!listGettingFiltered.includes(filteredList[i]))
            filteredList.splice(listGettingFiltered[i], 1);
        }
      } else {
        filteredList = listGettingFiltered;
      }
    }
    navigation.navigate('FilteredView', {
      data: {filteredList},
    });
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.os === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 200,
  },
});
Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
