import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [criptomonedas, setCriptomonedas] = useState([]);

  const obtenerMoneda = moneda => {
    setMoneda(moneda);
  };
  const obtenerCriptoMoneda = moneda => {
    setCriptomoneda(moneda);
  };

  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD');
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
});

export default Formulario;