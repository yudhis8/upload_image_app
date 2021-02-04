import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Header from '../../component/header';
import styles from './style';
const DetailImage = (props) => {
  console.log('🚀 ~ file: index.js ~ line 6 ~ DetailImage ~ props', props);
  const params = props.route.params;
  return (
    <View style={styles.container}>
      <Header onBackPress={() => props.navigation.goBack()} title="Detail" />

      <Image style={styles.image} source={{uri: params.data.path}}></Image>
      <Text style={styles.text}>latitude: {params.data.lat}</Text>
      <Text style={styles.text}>longitude: {params.data.lng}</Text>
    </View>
  );
};

export default DetailImage;
