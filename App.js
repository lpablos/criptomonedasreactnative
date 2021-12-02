/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
// Librerias
import {StyleSheet, Image, View} from 'react-native';

// Components of aplication
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

import axios from 'axios';



const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI){
        const resultado = await axios.get(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`,          
        );
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        setConsultarAPI(false);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI, criptomoneda, moneda]);
  return (
    <>
      <Header />
      <Image style={styles.imagen} source={require('./assets/img/cryptomonedas.png')} />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          consultarAPI={consultarAPI}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarAPI={setConsultarAPI}
        />
        <Cotizacion resultado={resultado}/>
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
