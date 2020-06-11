import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import constant from "../assets/constants";

const StartScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.tiles}>
        <Icon
          reverse
          name="md-list-box"
          type="ionicon"
          color="black"
          onPress={() => props.changeScreen("YearFilterScreen")}
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
    backgroundColor: constant.backgroundColor,
  },
  tiles: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartScreen;
