import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { AsyncStorage } from "react-native";
import Camera from "../components/Camera";
import ReturnBut from "../components/ReturnBut";
import { FlatList } from "react-native-gesture-handler";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      // AsyncStorage.removeItem("Prod");
      const stored = await AsyncStorage.getItem("Prod");
      let recupStorage = JSON.parse(stored);
      setProducts(recupStorage);
    };
    getProducts(products);
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Product", {
                  data: item.id
                });
              }}
            >
              {item.favorite === true ? (
                <View
                  style={{
                    margin: 10,
                    flexDirection: "row",
                    paddingBottom: 15,
                    borderBottomColor: "grey",
                    borderBottomWidth: 0.2
                  }}
                >
                  <View>
                    <Image
                      style={{ height: 100, width: 80, borderRadius: 25 }}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item.name}
                    </Text>

                    <Text style={{ color: "grey" }}> {item.brand} </Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      right: 30,
                      top: 30
                    }}
                  >
                    <SimpleLineIcons
                      size={20}
                      name="arrow-right"
                      color="grey"
                    />
                  </View>
                  <View style={{ position: "absolute", top: 50, left: 100 }}>
                    {item.nutriScore === "not-applicable" ? (
                      item.nova === "1" ? (
                        <View style={styles.score}>
                          <AntDesign
                            size={25}
                            name="checkcircleo"
                            color="#127336"
                            backgroundColor="#127336"
                          />
                          <Text style={styles.text}>"Nutri-Score: A"</Text>
                        </View>
                      ) : item.nova === "2" ? (
                        <View style={styles.score}>
                          <AntDesign
                            size={25}
                            name="checkcircleo"
                            color="#7BB228"
                            backgroundColor="#7BB228"
                          />
                          <Text style={styles.text}>"Nutri-Score: B/C"</Text>
                        </View>
                      ) : item.nova === "3" ? (
                        <View style={styles.score}>
                          <AntDesign
                            size={25}
                            name="checkcircleo"
                            color="#FBC21D"
                            backgroundColor="#FBC21D"
                          />
                          <Text style={styles.text}>"Nutri-Score: D"</Text>
                        </View>
                      ) : item.nova === "4" ? (
                        <View style={styles.score}>
                          <AntDesign
                            size={25}
                            name="exclamationcircleo"
                            color="#DF3623"
                            backgroundColor="#DF3623"
                          />
                          <Text style={styles.text}>"Nutri-Score: E"</Text>
                        </View>
                      ) : null
                    ) : item.nutriScore === "a" ? (
                      <View style={styles.score}>
                        <AntDesign
                          size={25}
                          name="checkcircleo"
                          color="#127336"
                          backgroundColor="#127336"
                        />
                        <Text style={styles.text}>"Nutri-Score: A"</Text>
                      </View>
                    ) : item.nutriScore === "b" ? (
                      <View style={styles.score}>
                        <AntDesign
                          size={25}
                          name="checkcircleo"
                          color="#7BB228"
                          backgroundColor="#7BB228"
                        />
                        <Text style={styles.text}>"Nutri-Score: B"</Text>
                      </View>
                    ) : item.nutriScore === "c" ? (
                      <View style={styles.score}>
                        <AntDesign
                          size={25}
                          name="checkcircleo"
                          color="#FBC21D"
                          backgroundColor="#FBC21D"
                        />
                        <Text style={styles.text}>"Nutri-Score: C"</Text>
                      </View>
                    ) : item.nutriScore === "d" ? (
                      <View style={styles.score}>
                        <AntDesign
                          size={25}
                          name="exclamationcircleo"
                          color="#EA741D"
                          backgroundColor="#EA741D"
                        />
                        <Text style={styles.text}>"Nutri-Score: D"</Text>
                      </View>
                    ) : item.nutriScore === "e" ? (
                      <View style={styles.score}>
                        <AntDesign
                          size={25}
                          name="closecircleo"
                          color="#DF3623"
                          backgroundColor="#DF3623"
                        />

                        <Text style={styles.text}>"Nutri-Score: E"</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <ReturnBut />
      <Camera />
    </>
  );
}

const styles = StyleSheet.create({
  topcontainer: {
    height: 130,
    padding: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginLeft: 15,
    fontSize: 15,
    color: "grey"
  },
  score: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    backgroundColor: "grey",
    height: 0.5,
    margin: 10,
    width: "100%",
    marginLeft: 35
  },
  box: {
    padding: 15,
    flexDirection: "row"
  },
  cat: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 6,
    marginBottom: 15
  }
});
