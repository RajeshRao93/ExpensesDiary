import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";
import WelcomeScreen from "./screens/welcomeScreen";
import StartScreen from "./screens/startScreen";
import ExpensesScreen from "./screens/expensesScreen";
import AddExpensesScreen from "./screens/addExpensesScreen";

export default function App() {
  const [screen, setScreen] = useState("");

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

  let content = <WelcomeScreen changeScreen={changeScreen} />;

  switch (screen) {
    case "ExpensesScreen":
      console.log("test");
      content = <ExpensesScreen changeScreen={changeScreen} />;
      break;
    case "StartScreen":
      content = <StartScreen changeScreen={changeScreen} />;
      break;
    case "WelcomeScreen":
      content = <WelcomeScreen changeScreen={changeScreen} />;
      break;
    case "AddExpensesScreen":
      console.log(screen);
      content = <AddExpensesScreen changeScreen={changeScreen} />;
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
