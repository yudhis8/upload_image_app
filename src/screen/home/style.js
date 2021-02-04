import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  rowArea: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '2%',
  },
  imageArea: {
    width: '32%',
    marginRight: '1%',
    marginTop: '1%',
  },
  image: {
    aspectRatio: 1,
  },
  flyButton: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  emptyImage: {
    alignSelf: 'center',
    width: '70%',
  },
  emptyText: {
    textAlign: 'center',
  },
});
