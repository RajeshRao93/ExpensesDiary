import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Animated } from "react-native";
import { Icon } from "react-native-elements";

let images = ["Food", "Rent", "Fuel", "Misc", "some"];

const StartScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.tiles}>
        <Icon
          reverse
          name="md-list-box"
          type="ionicon"
          color="black"
          onPress={() => props.changeScreen("MoreWishes")}
          size={50}
        />
        <Text>View Expenses</Text>
      </View>
      <View style={styles.tiles}>
        <Icon
          reverse
          name="md-add-circle"
          type="ionicon"
          color="black"
          onPress={() => props.changeScreen("AddExpensesScreen")}
          size={50}
        />
        <Text>Add Expenses</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tiles: {
    width: "100%",
    height: "50%",
    backgroundColor: "#ffcc00", //"#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartScreen;
