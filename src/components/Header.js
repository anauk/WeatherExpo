import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primaryEnd } from '../utils/Colors';

const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{title.toUpperCase()}</Text>
  </View>
);
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40,
  },
  headerText: {
    color: primaryEnd,
    fontSize: 30,
    fontWeight: '500'
  }
});
export default Header;
