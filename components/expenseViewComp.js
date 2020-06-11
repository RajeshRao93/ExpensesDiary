import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

const ExpenseViewComp = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.expView}>
        <View style={styles.top}>
          <Text style={styles.text}>Month: {props.month} </Text>
          <Text style={styles.text}>Total: {props.total}</Text>
        </View>
        {props.expenses.map((exp, i) => (
          <View key={exp.id} style={styles.bottom}>
            <View style={styles.details}>
              <Text style={styles.text}>Date: {exp.date}</Text>
              <Text style={styles.text}>Category: {exp.category} </Text>
              <Text style={styles.text}>Amount: {exp.amount} </Text>
              <Text style={styles.text}>Note: {exp.note}</Text>
            </View>
            <View style={styles.deleteBut}>
              <Icon
                reverse
                name="md-remove-circle"
                type="ionicon"
                color="red"
                onPress={() => {
                  props.deleteExpense(exp.id);
                }}
                size={10}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
  deleteBut: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  details: {
    width: "80%",
    padding: 10,
  },
  expView: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  top: {
    flex: 1,
    height: "50%",
    margin: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  bottom: {
    flex: 1,
    margin: 10,
    height: "50%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  text: {
    fontFamily: "Ubuntu",
    fontSize: 15,
    marginBottom: 5,
  },
});

export default ExpenseViewComp;
