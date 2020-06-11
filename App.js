import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";
import WelcomeScreen from "./screens/welcomeScreen";
import StartScreen from "./screens/startScreen";
import YearFilterScreen from "./screens/yearFilterScreen";
import AddExpensesScreen from "./screens/addExpensesScreen";
import MonthFilterScreen from "./screens/monthFilterScreen";
import ExpenseListSceen from "./screens/expenseListScreen";

export default function App() {
  const [screen, setScreen] = useState("");
  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");

  let [fontsLoaded] = useFonts({
    Pacifico: require("./assets/fonts/Pacifico.ttf"),
    "Inter-SemiBoldItalic":
      "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
    Ubuntu: require("./assets/fonts/Ubuntu-Bold.ttf"),
    Indie: require("./assets/fonts/Indie.ttf"),
  });

  const changeScreen = (screenName) => {
    setScreen(screenName);
  };

  const navigateScreen = (screenName, filter1, filter2) => {
    setFilter1(filter1);
    setFilter2(filter2);
    setScreen(screenName);
  };

  let content = <WelcomeScreen changeScreen={changeScreen} />;

  switch (screen) {
    case "YearFilterScreen":
      content = <YearFilterScreen navigateScreen={navigateScreen} />;
      break;
    case "MonthFilterScreen":
      content = (
        <MonthFilterScreen
          navigateScreen={navigateScreen}
          year={filter1}
          month={filter2}
        />
      );
      break;
    case "StartScreen":
      content = <StartScreen changeScreen={changeScreen} />;
      break;
    case "WelcomeScreen":
      content = <WelcomeScreen changeScreen={changeScreen} />;
      break;
    case "AddExpensesScreen":
      content = <AddExpensesScreen changeScreen={changeScreen} />;
      break;
    case "ExpenseListScreen":
      content = (
        <ExpenseListSceen
          navigateScreen={navigateScreen}
          year={filter1}
          month={filter2}
        />
      );
      break;
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    //console.log(screen);
    return <View style={{ flex: 1 }}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
