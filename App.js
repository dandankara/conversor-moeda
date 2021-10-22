import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard
} from "react-native";

import PickerCoins from "./src/components/PickerCoins/PickerCoins";
import api from "./src/services/api";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [coinSelected, setCoinSelected] = useState(null);
  const [coinValue, setCoinValue] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {
    async function LoadingCoins() {
      //pega todas as moedas da api dentro de uma variável
      // só que é mantido um objeto por conta da api, preciso de um array
      const res = await api.get("all");

      //preciso de uma variável que guarde as minhas informações das moedas
      let ArrayCoins = [];

      //transforma o objeto em um array com as keys das moedas, padrão Javascript
      //Pegando somente as keys das moedas
      Object.keys(res.data).map((key) => {
        //pega todas as keys e insere(push) no meu array acima
        ArrayCoins.push({
          key: key,
          label: key,
          value: key,
        });
      });

      setCoins(ArrayCoins);
      setLoading(false);
    }

    LoadingCoins();
  }, []);

  async function Converter() {
    if(coinSelected === null || coinValue === 0 ){
      alert('Por favor selecione a moeda');
      return;
    }else{

      const res = await api.get(`all/${coinSelected}-BRL`);
      console.log(res.data )
  
  
      let ResultCoin = (res.data[coinSelected].ask * parseFloat(coinValue) )
  
      setValorConvertido(`R$ ${ResultCoin.toFixed(2)}`);
      setCoinValue(coinValue)

      //fecha o teclado, caso ele estiver aberto
      Keyboard.dismiss();
    }
  }

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        {/* Loading nativo do react */}
        <ActivityIndicator color="#FFF" size={45} />
      </View>
    );
  } else {
    return (
      <View style={styles.Container}>
        <View style={styles.ViewSelectMoeda}>
          <Text style={styles.TextSelectMoeda}>Selecione a moeda</Text>

          {/* A moeda que selecionei, seta ela pra moeda que eu selecionei */}
          <PickerCoins
            coins={coins}
            onChange={(coin) => setCoinSelected(coin)}
          />
          {/* Vou mandar todas as moedas para o picker por meio de props */}
          {/* Sei que ele tá dentro de coins pq dei setCoins(ArrayCoins) */}

          <View style={styles.ViewValueConvert}>
            <Text style={styles.TextConvert}>
              Digite o valor a ser convertido em (R$)
            </Text>
            <TextInput
              onChangeText={(value) => setCoinValue(value)}
              keyboardType="numeric"
              style={styles.InputValue}
              placeholder="EX: 2000"
            />
          </View>

            <TouchableOpacity style={styles.ButtonConvert} onPress={Converter}>
              <Text style={styles.TextButton}>Converter</Text>
            </TouchableOpacity>
          
        </View>

        {valorConvertido !== 0 && (
          <View style={styles.ViewResult}>
            <Text style={styles.ValueConvertText}> {coinValue} {coinSelected}</Text>
            <Text style={styles.ValueConvertText}>Corresponde a</Text>
            <Text style={styles.ValueConvertText}>{valorConvertido} </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#101215",
    paddingTop: 40,
  },

  ViewSelectMoeda: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    paddingTop: 9,
    borderRadius: 10,
  },

  TextSelectMoeda: {
    margin: 10,
    fontSize: 20,
  },

  ViewValueConvert: {
    backgroundColor: "#f9f9f9f9",
    borderTopWidth: 1,
    marginTop: 10,
  },

  TextConvert: {
    margin: 10,
    fontSize: 20,
  },

  InputValue: {
    margin: 10,
    fontSize: 15,
  },

  ViewButtonConvert: {
    marginTop: 10,
  },

  ButtonConvert: {
    backgroundColor: "red",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  TextButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  // ESTILIZAÇÃO DA VIEW DE RESULTADOS

  ViewResult: {
    backgroundColor: "#f9f9f9",
    width: "90%",
    marginTop: 50,
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    padding: 60,
  },
  ValueConvertText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
