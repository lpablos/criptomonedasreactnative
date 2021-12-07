/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
// Librerias
import {StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';

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
  const [ cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI){
        setCargando(true);
        const resultado = await axios.get(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}` );
          setTimeout(() => {
            setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
            setConsultarAPI(false);       
            setCargando(false);   
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI, criptomoneda, moneda]);


  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion  resultado={resultado} />


  return (
    <>
     <ScrollView>
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
      </View>
      <View style={{ marginTop: 40 }}>
          {componente}
      </View>

      </ScrollView>
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
