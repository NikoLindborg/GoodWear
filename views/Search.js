import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView, Text} from 'react-native';
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
    <KeyboardAvoidingView
      behavior={Platform.os === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <View style={{alignSelf: 'center', paddingTop: 50}}>
        <Text>Search for products here</Text>
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
    flex: 1,
    marginTop: 200,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  header: {

  },
});
Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
