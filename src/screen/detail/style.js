import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    resizeMode: 'stretch',
  },
  text: {
    margin: 5,
  },
});
