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
import { Icon } from "react-native-elements";
import * as SQLite from "expo-sqlite";
import constants from "../assets/constants";

const YearFilterScreen = (props) => {
  const db = SQLite.openDatabase("ExpensesDb", 1);
  const [year, setYear] = useState([]);
  const [show, setShow] = useState(false);
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

  if (year.length == 0) {
    db.transaction((tx) => {
      tx.executeSql("select distinct year from expenses", [], (_, { rows }) => {
        var i;
        setDataLength(rows.length);
        for (i = 0; i < rows.length; i++) {
          year.push(rows.item(i).year);
        }
        setShow(true);
      });
    });
  }

  animate(Easing.elastic(6));

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Icon
            reverse
            name="md-arrow-back"
            type="ionicon"
            color="black"
            onPress={() => props.navigateScreen("StartScreen", "")}
            size={15}
          />
          <Text style={styles.heading}>Choose year</Text>
        </View>
      </View>
      <Animated.View style={animatedStyles}>
        {show && (
          <ScrollView>
            <View style={styles.scrollview}>
              <Text
                style={{ fontSize: 15, fontFamily: "Ubuntu", color: "white" }}
              >
                You have expenses recorded in {dataLength} years
              </Text>
              {year.map((y, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.touchables}
                  onPress={() =>
                    props.navigateScreen("MonthFilterScreen", y, "")
                  }
                >
                  <Text style={styles.tile}>{y}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  tile: {
    fontFamily: "Ubuntu",
    fontSize: 25,
  },
  touchables: {
    marginTop: 10,
    width: 200,
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
  },
});

export default YearFilterScreen;
