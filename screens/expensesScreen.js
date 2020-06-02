import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Animated,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import ExpenseListComp from "../components/expenseListComp";

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const ExpensesScreen = (props) => {
  var today = new Date();
  var date = months[today.getMonth()] + "-" + today.getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.headingView}>
        <Text style={styles.heading}>{date}</Text>
      </View>
      <ScrollView>
        <ExpenseListComp />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    borderColor: "white",
  },

  heading: {
    fontFamily: "Ubuntu",
    color: "black",
    fontSize: 40,
    paddingTop: 25,
    alignSelf: "center",
  },
  headingView: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});

export default ExpensesScreen;
