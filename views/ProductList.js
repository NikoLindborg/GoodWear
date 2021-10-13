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
    setLoading(true);
    const emptyArray = [];
    for (const id of idArray) {
      const finalProduct = await loadSingleMedia(id);
      emptyArray.push(finalProduct);
    }
    setFinalProducts(emptyArray);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      for (const item of mediaArray) {
        const postTags = await getPostTags(item.file_id);
        postTags.forEach((productObject) => {
          if (productObject.tag === sortByCategory) {
            productIdList.push(productObject.file_id);
          }
        });
      }
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
