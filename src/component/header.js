import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Header = (props) => (
  <View style={styles.headerArea}>
    <TouchableOpacity
      disabled={props.noBack}
      onPress={props.onBackPress}
      style={styles.left}>
      {!props.noBack && (
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      )}
    </TouchableOpacity>
    <View style={styles.body}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
    <View style={styles.right}></View>
  </View>
);

const styles = StyleSheet.create({
  headerArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  left: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
});

export default Header;
