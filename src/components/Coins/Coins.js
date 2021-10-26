import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import RNPickerSelect from "react-native-picker";

export default function Coins() {
  return (
    <View styles={styles.ViewContainer}>

        <Text>daniel</Text>

        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    margin: 10,
  },
});
