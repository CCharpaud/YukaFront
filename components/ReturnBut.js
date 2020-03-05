import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function ReturnBut() {
  const navigation = useNavigation();
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        alignSelf: "flex-end",
        bottom: 20,
        left: 20
      }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <View
        style={{
          backgroundColor: "#5DCD71",
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 35
        }}
      >
        <Ionicons name="ios-return-left" color="white" size={30} />
      </View>
    </TouchableOpacity>
  );
}
