import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CameraScreen() {
  const navigation = useNavigation();
  const [cameraPermission, setCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");

  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setCameraPermission(status === "granted");
    };
    askPermission();
  }, []);

  handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setData(data);
    navigation.navigate("Product", {
      data: data
    });
  };

  if (cameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View
        style={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40
        }}
      >
        {scanned && (
          <TouchableOpacity onPress={() => setScanned(false)}>
            <View
              style={{
                backgroundColor: "#5DCD71",
                height: 100,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                opacity: 0.7
              }}
            >
              <MaterialCommunityIcons name="carrot" color="orange" size={30} />
              <Text style={{ color: "orange" }}> Scan Again </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
