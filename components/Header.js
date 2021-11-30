import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';

const Header = () => {
  return (<Text style={styles.encabezado}>Criptomonedas</Text>);
};

const styles = StyleSheet.create({
  encabezado: {
    fontFamily: 'Lato-Black',
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
    color: '#FFF',
    backgroundColor: '#5E49E2',
    paddingBottom: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    marginBottom: 30,
  },
});

export default Header;
