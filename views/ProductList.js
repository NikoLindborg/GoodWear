import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import {useMedia, useTag} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';
import {MainContext} from '../contexts/MainContext';

const ProductList = ({route, navigation}) => {
  const {loadSingleMedia} = useMedia();
  const {mediaArray} = useContext(MainContext);

  const {getPostTags} = useTag();
  const sortByCategory = route.params.category;

  let productIdList = [];
  let [finalProducts, setFinalProducts] = useState([]);

  const getMedia = async (idArray) => {
    let emptyArray = [];
    for (const id of idArray) {
      const finalProduct = await loadSingleMedia(id);
      emptyArray.push(finalProduct);
    }
    setFinalProducts(emptyArray);
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
    <FlatList
      data={finalProducts}
      style={{alignItems: 'center'}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

const styles = StyleSheet.create({});

ProductList.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  category: PropTypes.string,
};

export default ProductList;
