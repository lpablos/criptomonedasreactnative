/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// Librerias
import {StyleSheet, Image, View} from 'react-native';

// Components of aplication
import Header from './components/Header';
import Formulario from './components/Formulario';

const App = () => {
  return (
    <>
      <Header />
      <Image style={styles.imagen} source={require('./assets/img/cryptomonedas.png')} />
      <View style={styles.contenido}>
        <Formulario />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '3%',
  },
});

export default App;
