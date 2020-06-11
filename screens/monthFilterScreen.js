import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  Easing,
} from "react-native";
import { Icon, Badge } from "react-native-elements";
import * as SQLite from "expo-sqlite";
import constants from "../assets/constants";

const MonthFilterScreen = (props) => {
  const db = SQLite.openDatabase("ExpensesDb", 1);
  const [month, setMonth] = useState([]);
  const [show, setShow] = useState(false);
  const [yearlySum, setYearlySum] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  let opacity = new Animated.Value(0);

  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 650],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: "100%",
      height: size,
    },
  ];
  if (month.length == 0) {
    db.transaction((tx) => {
      tx.executeSql(
        "select distinct month from expenses where year = " + props.year,
        [],
        (_, { rows }) => {
          var i;
          setDataLength(rows.length);
          for (i = 0; i < rows.length; i++) {
            month.push(rows.item(i).month);
          }
          setShow(true);
        }
      );

      tx.executeSql(
        "select sum(amount) as total from expenses where year = " + props.year,
        [],
        (_, { rows }) => {
          setYearlySum(rows.item(0).total);
        }
      );
    });
  }

  animate(Easing.elastic(6));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          reverse
          name="md-arrow-back"
          type="ionicon"
          color="black"
          onPress={() => props.navigateScreen("YearFilterScreen", "")}
          size={15}
        />
        <Text style={styles.heading}>Choose month</Text>
      </View>
      <Animated.View style={animatedStyles}>
        {show && (
          <ScrollView>
            <View style={styles.scrollview}>
              <Text style={styles.totalexpenseText}>
                Total expenses in {props.year} :
              </Text>
              <View style={styles.sum}>
                <Text style={styles.sumText}>{yearlySum}</Text>
              </View>

              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Ubuntu",
                  color: "white",
                  marginTop: 20,
                }}
              >
                You have expenses recorded in {dataLength} month
              </Text>
              {month.map((m, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.touchables}
                  onPress={() =>
                    props.navigateScreen("ExpenseListScreen", props.year, m)
                  }
                >
                  <Text style={styles.tile}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.backgroundColor,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    borderColor: "white",
  },
  heading: {
    fontSize: 35,
    fontFamily: "Ubuntu",
    color: "white",
  },
  header: {
    paddingTop: 40,
    flexDirection: "row",
  },
  scrollview: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
  sum: {
    marginTop: 10,
    marginLeft: 10,
    height: 35,
    width: 120,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
  },
  sumText: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    color: "black",
  },
  tile: {
    fontFamily: "Ubuntu",
    fontSize: 25,
  },
  totalexpenseText: {
    marginTop: 15,
    fontFamily: "Ubuntu",
    fontSize: 20,
  },
  touchables: {
    marginTop: 10,
    marginLeft: 10,
    width: 100,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
  },
});

export default MonthFilterScreen;
