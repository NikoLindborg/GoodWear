/**
 * JS-file for ProductList view.
 *
 * The products in here are shown based on a given category suchs as "jackets" or "jeans"
 *
 * @author Aleksi Kosonen, Niko Lindborg & Aleksi Kytö
 *
 **/

import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {useMedia, useTag} from '../hooks/ApiHooks';

import List from '../components/List';

const ProductList = ({route, navigation}) => {
  const {loadSingleMedia} = useMedia();
  const {getPostTags} = useTag();
  const sortByCategory = route.params.category;
  const mediaArray = route.params.data;

  const productIdList = [];
  const [finalProducts, setFinalProducts] = useState([]);
  const [loading, setLoading] = useState();

  const getMedia = async (idArray) => {
    // Loading state to show ActivityIndicator
    setLoading(true);
    const emptyArray = [];
    // Media is requested based on the file_id:s in the list
    for (const id of idArray) {
      const finalProduct = await loadSingleMedia(id);
      emptyArray.push(finalProduct);
    }
    // Array is set to state
    setFinalProducts(emptyArray);
    setLoading(false);
  };

  //  UseEffect for looping through mediaArray to get tags to all posts
  useEffect(() => {
    (async () => {
      for (const item of mediaArray) {
        const postTags = await getPostTags(item.file_id);
        //  Here tags are filtered to check if they belong to given category
        postTags.forEach((productObject) => {
          //  If product has a tag that equals to given category it is added to productIdList
          if (productObject.tag === sortByCategory) {
            productIdList.push(productObject.file_id);
          }
        });
      }
      //  Gets media based on the list that contains file_id:s that correspond to given category
      getMedia(productIdList);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator style={{alignSelf: 'center'}} />
      ) : (
        <List
          navigation={navigation}
          isHorizontal={false}
          data={finalProducts}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

ProductList.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  category: PropTypes.string,
};

export default ProductList;
