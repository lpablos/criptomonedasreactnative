import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({moneda, criptomoneda, consultarAPI, setMoneda, setCriptomoneda, setConsultarAPI}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  const obtenerMoneda = moneda => {
    setMoneda(moneda);
  };
  const obtenerCriptoMoneda = moneda => {
    setCriptomoneda(moneda);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    console.log('Pasa la validacion');
    setConsultarAPI(true);
  };
  const mostrarAlerta = () =>{
    Alert.alert('Error', 'Ambos campos son obligatorios',[
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await axios.get(
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD',
      );
      setCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}>
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Dolar de estados unidos" value="USD" />
        <Picker.Item label="Peso Méxicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={monedaCripto => obtenerCriptoMoneda(monedaCripto)}>
        <Picker.Item label="Seleccione" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#454545',
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    textColor: '#FFF',
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
