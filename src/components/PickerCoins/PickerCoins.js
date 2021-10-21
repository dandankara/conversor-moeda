import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";

// import { Picker } from "@react-native-picker/picker";

import RNPickerSelect from "react-native-picker-select";

export default function PickerCoins(props) {

  const placeholder ={
    label: 'Selecione uma moeda',
    value: null,
    color:'#000'
  }
  return (
    <View style={styles.ViewContainer}>

      <RNPickerSelect
      placeholder={placeholder}
      items={props.coins}
      onValueChange={(valor) => props.onChange(valor)}
        style={
          Platform.OS === "ios"
            ? pickerSelectSyles.inputIOS
            : pickerSelectSyles.inputAndroid
        }
      
      />
    </View>
  ); 
}

const styles = StyleSheet.create({
  ViewContainer: {
    margin: 10,
  },
});

const pickerSelectSyles = StyleSheet.create({
  inputIOS: {},
  inputAndroid: {},
});
