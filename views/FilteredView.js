import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
import List from '../components/List';

const FilteredView = ({route, navigation}) => {
  const data = route.params.data.filteredList
    ? route.params.data.filteredList
    : route.params.data;
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <List
        navigation={navigation}
        isHorizontal={false}
        data={data}
        loading={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#FFF',
  },
});

FilteredView.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default FilteredView;
