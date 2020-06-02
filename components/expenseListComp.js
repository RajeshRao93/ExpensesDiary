import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Animated } from "react-native";

let images = ["Food", "Rent", "Fuel", "Misc", "some"];

const ExpenseListComp = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.expenseView}>
        <View style={styles.day}>
          <Text>DATE</Text>
          <Text>Total : </Text>
        </View>

        {images.map((image) => (
          <View style={styles.expenses}>
            <Text>{image}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  day: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  expenses: {
    width: "100%",
  },
  expenseView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    height: "100%",
    backgroundColor: "#f2f2f2",
  },
});

export default ExpenseListComp;
