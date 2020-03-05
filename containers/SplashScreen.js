import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get("window");

export default function SplashScreen(props) {
  const { setIsLoading } = props;

  useEffect(() => {
    setTimeout(function() {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.box}>
      <ActivityIndicator size="large" color="#5DCD71" />
      <Image style={styles.img} source={require("../assets/Logo-Yuka.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    resizeMode: "contain"
  },

  box: {
    flex: 1,
    backgroundColor: "#5DCD71",
    justifyContent: "center",
    alignItems: "center"
  }
});
