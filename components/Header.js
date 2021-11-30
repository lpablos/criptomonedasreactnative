import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';

const Header = () => {
  return <Text style={styles.encabezado}>Criptomonedas</Text>;
};

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    color: '#1c0d02',
  },
});

export default Header;
