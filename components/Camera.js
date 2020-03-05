import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function Camera() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        alignSelf: "flex-end",
        bottom: 20,
        right: 20
      }}
      onPress={() => {
        navigation.navigate("Camera");
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
        <MaterialCommunityIcons name="barcode-scan" color="white" size={30} />
      </View>
    </TouchableOpacity>
  );
}
