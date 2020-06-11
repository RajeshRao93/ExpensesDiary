import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Animated } from "react-native";
import { Icon } from "react-native-elements";
import constant from "../assets/constants";

const WelcomeScreen = (props) => {
  const [fade, setFade] = useState(new Animated.Value(0));

  //Animation for Wish view
  const fadeAnimation = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  fadeAnimation();
  const change = () => {
    props.changeScreen("StartScreen");
  };

  setTimeout(() => {
    change();
  }, 2000);

  return (
    <View style={styles.animated}>
      <Animated.View style={{ opacity: fade }}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>EXPENSE DIARY</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  animated: {
    flex: 1,
    backgroundColor: constant.backgroundColor,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderColor: "white",
  },

  logo: {
    fontFamily: "Ubuntu",
    color: "black",
    fontSize: 50,
    paddingLeft: 50,
  },

  logoView: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default WelcomeScreen;
