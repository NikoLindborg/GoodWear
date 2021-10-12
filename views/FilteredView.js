import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
import List from '../components/List';

const FilteredView = ({route, navigation}) => {
  const data = route.params.data.filteredList
    ? route.params.data.filteredList
    : route.params.data;
  return (
    <ScrollView>
      <SafeAreaView style={styles.droidSafeArea}>
        <List
          navigation={navigation}
          isHorizontal={false}
          data={data}
          loading={false}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
});

FilteredView.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default FilteredView;
