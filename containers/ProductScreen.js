import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { AsyncStorage } from "react-native";
import ReturnBut from "../components/ReturnBut";
import Camera from "../components/Camera";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons
} from "@expo/vector-icons";

export default function ProductScreen() {
  const [product, setProduct] = useState({});
  const [localProduct, setLocalProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { params } = useRoute();
  // const [star, setStar] = useState(false);

  const savingProduct = async object => {
    const storedString = await AsyncStorage.getItem("Prod");
    if (storedString !== null) {
      const storedArray = JSON.parse(storedString);

      let foundId = null;
      for (let i = 0; i < storedArray.length; i++) {
        if (storedArray[i].id === object._id) {
          foundId = i;
        }
      }
      if (foundId === null) {
        const savProd = {
          id: object._id,
          brand: object.brands,
          name: object.product_name,
          image: object.image_front_url,
          nova: object.nova_groups,
          nutriScore: object.nutrition_grades_tags[0],
          favorite: false
        };

        storedArray.push(savProd);
        let toStore = JSON.stringify(storedArray);
        await AsyncStorage.setItem("Prod", toStore);
        setLocalProduct(savProd);
      } else {
        setLocalProduct(storedArray[foundId]);
      }
    } else {
      let array = [];
      const savProd = {
        id: object._id,
        brand: object.brands,
        name: object.product_name,
        image: object.image_front_url,
        nova: object.nova_groups,
        nutriScore: object.nutrition_grades_tags[0],
        favorite: false
      };

      array.push(savProd);
      let stringifiedArray = JSON.stringify(array);
      await AsyncStorage.setItem("Prod", stringifiedArray);
      setLocalProduct(savProd);
    }
  };

  useEffect(() => {
    const sendData = async () => {
      try {
        send = await axios.post("https://yuka-by-c.herokuapp.com/add-product", {
          id: params.data
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://world.openfoodfacts.org/api/v0/product/" + params.data
        );

        if (response.data) {
          setProduct(response.data.product);
          savingProduct(response.data.product);
          setIsLoading(false);
        } else {
          alert("An error occurred");
        }
      } catch (e) {
        alert("An error occurred");
      }
    };

    sendData();
    fetchData();
  }, []);

  console.log("localProduct", localProduct);
  if (isLoading === true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5DCD71" />
      </View>
    );
  } else {
    return (
      <>
        <ScrollView>
          <View style={styles.topcontainer}>
            {!product.image_front_url ? (
              <Image
                style={{ height: 100, width: 100, borderRadius: 25 }}
                source={{
                  uri:
                    "www.labaleine.fr/sites/baleine/files/image-not-found.jpg"
                }}
              />
            ) : (
              <Image
                style={{ height: 100, width: 100, borderRadius: 25 }}
                source={{ uri: product.image_front_url }}
              />
            )}

            <View style={{ paddingLeft: 15, flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "200" }}>
                {product.product_name}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "200",
                  color: "grey",
                  fontSize: 15
                }}
              >
                {product.brands}
              </Text>

              <TouchableOpacity
                onPress={async () => {
                  console.log("product id event", product.id);

                  // let fav = {
                  //   favorite: true
                  // };
                  // const modified = await AsyncStorage.mergeItem(
                  //   "Prod" + product.id,
                  //   JSON.stringify(fav)
                  // );

                  const storedString = await AsyncStorage.getItem("Prod");
                  if (storedString !== null) {
                    const storedArray = JSON.parse(storedString);

                    for (let i = 0; i < storedArray.length; i++) {
                      if (storedArray[i].id === product.id) {
                        storedArray[i].favorite = !storedArray[i].favorite;
                      }
                    }

                    await AsyncStorage.setItem(
                      "Prod",
                      JSON.stringify(storedArray)
                    );
                  }

                  setLocalProduct({
                    ...localProduct,
                    favorite: !localProduct.favorite
                  });
                }}
              >
                <View style={{ marginTop: 3 }}>
                  {localProduct.favorite ? (
                    <AntDesign size={30} name="star" color="gold" />
                  ) : (
                    <AntDesign size={30} name="staro" color="gold" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {product.nutrition_grades_tags[0] === "not-applicable" ? (
              product.nova_groups === "1" || product.nova_group === "1" ? (
                <View style={styles.score}>
                  <AntDesign
                    size={25}
                    name="checkcircleo"
                    color="#127336"
                    backgroundColor="#127336"
                  />
                  <Text style={styles.text}>
                    "Nutri-Score: A - Bonne qualité Nutritionnelle"
                  </Text>
                </View>
              ) : product.nova_groups === "2" || product.nova_group === "2" ? (
                <View style={styles.score}>
                  <AntDesign
                    size={25}
                    name="checkcircleo"
                    color="#7BB228"
                    backgroundColor="#7BB228"
                  />
                  <Text style={styles.text}>
                    "Nutri-Score: B/C - Qualité nutritionnelle Moyenne"
                  </Text>
                </View>
              ) : product.nova_groups === "3" || product.nova_group === "3" ? (
                <View style={styles.score}>
                  <AntDesign
                    size={25}
                    name="checkcircleo"
                    color="#FBC21D"
                    backgroundColor="#FBC21D"
                  />
                  <Text style={styles.text}>
                    "Nutri-Score: D - Qualité nutritionnelle Médiocre"
                  </Text>
                </View>
              ) : product.nova_groups === "4" || product.nova_group === "4" ? (
                <View style={styles.score}>
                  <AntDesign
                    size={25}
                    name="exclamationcircleo"
                    color="#DF3623"
                    backgroundColor="#DF3623"
                  />
                  <Text style={styles.text}>
                    "Nutri-Score: E - Qualité nutritionnelle Mauvaise"
                  </Text>
                </View>
              ) : null
            ) : product.nutrition_grades_tags[0] === "a" ? (
              <View style={styles.score}>
                <AntDesign
                  size={25}
                  name="checkcircleo"
                  color="#127336"
                  backgroundColor="#127336"
                />
                <Text style={styles.text}>
                  "Nutri-Score: A - Bonne qualité Nutritionnelle"
                </Text>
              </View>
            ) : product.nutrition_grades_tags[0] === "b" ? (
              <View style={styles.score}>
                <AntDesign
                  size={25}
                  name="checkcircleo"
                  color="#7BB228"
                  backgroundColor="#7BB228"
                />
                <Text style={styles.text}>
                  "Nutri-Score: B - Qualité nutritionnelle Correcte"
                </Text>
              </View>
            ) : product.nutrition_grades_tags[0] === "c" ? (
              <View style={styles.score}>
                <AntDesign
                  size={25}
                  name="checkcircleo"
                  color="#FBC21D"
                  backgroundColor="#FBC21D"
                />
                <Text style={styles.text}>
                  "Nutri-Score: C - Qualité nutritionnelle Moyenne"
                </Text>
              </View>
            ) : product.nutrition_grades_tags[0] === "d" ? (
              <View style={styles.score}>
                <AntDesign
                  size={25}
                  name="exclamationcircleo"
                  color="#EA741D"
                  backgroundColor="#EA741D"
                />
                <Text style={styles.text}>
                  "Nutri-Score: D - Qualité nutritionnelle Médiocre"
                </Text>
              </View>
            ) : product.nutrition_grades_tags[0] === "e" ? (
              <View style={styles.score}>
                <AntDesign
                  size={25}
                  name="closecircleo"
                  color="#DF3623"
                  backgroundColor="#DF3623"
                />

                <Text style={styles.text}>
                  "Nutri-Score: E - Qualité nutritionnelle Mauvaise"
                </Text>
              </View>
            ) : null}
          </View>
          <View
            style={{
              backgroundColor: "#EBEBEB",
              height: 20,
              marginTop: 30
            }}
          />
          <View
            style={{
              padding: 15
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons size={20} name="kitchen" color="grey" />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 6,
                  marginBottom: 15
                }}
              >
                Ingrédients :
              </Text>
              <Text> {product.ingredients_text_fr} </Text>
            </View>

            <View
              style={{
                backgroundColor: "grey",
                height: 0.5,
                margin: 10,
                marginTop: 30,
                width: "100%"
              }}
            />
          </View>
          <View
            style={{
              padding: 15,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <MaterialCommunityIcons size={20} name="nutrition" color="grey" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 6,
                paddingRight: 10
              }}
            >
              Nutriments :
            </Text>
            <View>
              {product.nutrient_levels.fat === "low" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="checkcircleo"
                    color="#127336"
                    backgroundColor="#127336"
                  />
                  <Text style={{ paddingLeft: 10 }}> Graisse</Text>
                </View>
              ) : product.nutrient_levels.fat === "high" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="closecircleo"
                    color="#DF3623"
                    backgroundColor="#DF3623"
                  />
                  <Text style={{ paddingLeft: 10 }}> Graisse </Text>
                </View>
              ) : product.nutrient_levels.fat === undefined ? (
                <Text> Catégorie indisponible </Text>
              ) : product.nutrient_levels.fat === "moderate" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="closecircleo"
                    color="#FBC21D"
                    backgroundColor="#FBC21D"
                  />
                  <Text style={{ paddingLeft: 10 }}> Graisse </Text>
                </View>
              ) : null}

              {product.nutrient_levels.sugars === "low" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="checkcircleo"
                    color="#127336"
                    backgroundColor="#127336"
                  />
                  <Text style={{ paddingLeft: 10 }}> Sucre </Text>
                </View>
              ) : product.nutrient_levels.sugars === "high" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="closecircleo"
                    color="#DF3623"
                    backgroundColor="#DF3623"
                  />
                  <Text style={{ paddingLeft: 10 }}> Sucre </Text>
                </View>
              ) : product.nutrient_levels.sugars === "undefined" ? (
                <Text> Catégorie indisponible </Text>
              ) : product.nutrient_levels.sugars === "moderate" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="closecircleo"
                    color="#FBC21D"
                    backgroundColor="#FBC21D"
                  />
                  <Text style={{ paddingLeft: 10 }}> Sucre </Text>
                </View>
              ) : null}

              {product.nutrient_levels.salt === "low" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="checkcircleo"
                    color="#127336"
                    backgroundColor="#127336"
                  />
                  <Text style={{ paddingLeft: 10 }}> Sel </Text>
                </View>
              ) : product.nutrient_levels.salt === "high" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="closecircleo"
                    color="#DF3623"
                    backgroundColor="#DF3623"
                  />
                  <Text style={{ paddingLeft: 10 }}> Sel </Text>
                </View>
              ) : product.nutrient_levels.salt === "undefined" ? (
                <Text> Catégorie indisponible </Text>
              ) : product.nutrient_levels.salt === "moderate" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="closecircleo"
                    color="#FBC21D"
                    backgroundColor="#FBC21D"
                  />
                  <Text style={{ paddingLeft: 10 }}> Sel </Text>
                </View>
              ) : null}

              {product.nutrient_levels["saturated-fat"] === "low" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="checkcircleo"
                    color="#127336"
                    backgroundColor="#127336"
                  />
                  <Text style={{ paddingLeft: 10 }}> Graisse saturée </Text>
                </View>
              ) : product.nutrient_levels["saturated-fat"] === "high" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="closecircleo"
                    color="#DF3623"
                    backgroundColor="#DF3623"
                  />
                  <Text style={{ paddingLeft: 10 }}> Graisse saturée </Text>
                </View>
              ) : product.nutrient_levels["saturated-fat"] === "undefined" ? (
                <Text> Catégorie indisponible </Text>
              ) : product.nutrient_levels["saturated-fat"] === "moderate" ? (
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    size={15}
                    name="closecircleo"
                    color="#FBC21D"
                    backgroundColor="#FBC21D"
                  />
                  <Text style={{ paddingLeft: 10 }}> Graisse saturée </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.line} />
          {product.quantity === "" ? (
            <View style={styles.box}>
              <MaterialCommunityIcons
                size={20}
                name="weight-kilogram"
                color="grey"
              />
              <Text style={styles.cat}>Quantité :</Text>
              <Text style={{ paddingLeft: 10 }}>Information indisponible</Text>
            </View>
          ) : (
            <View style={styles.box}>
              <MaterialCommunityIcons
                size={20}
                name="weight-kilogram"
                color="grey"
              />
              <Text style={styles.cat}>Quantité :</Text>
              <Text style={{ paddingLeft: 10 }}> {product.quantity} </Text>
            </View>
          )}

          <View style={styles.line} />
          {product.packaging === "" ? (
            <View style={styles.box}>
              <Octicons size={20} name="package" color="grey" />
              <Text style={styles.cat}>Packaging :</Text>
              <Text style={{ paddingLeft: 10 }}>Information indisponible</Text>
            </View>
          ) : (
            <View style={styles.box}>
              <Octicons size={20} name="package" color="grey" />
              <Text style={styles.cat}>Packaging :</Text>
              <Text style={{ paddingLeft: 10 }}> {product.packaging} </Text>
            </View>
          )}

          <View style={styles.line} />

          {product.categories === "" ? (
            <View
              style={{
                padding: 15,
                flexDirection: "row"
              }}
            >
              <MaterialIcons size={20} name="class" color="grey" />
              <Text style={styles.cat}>Catégories :</Text>
              <Text style={{ paddingLeft: 10 }}>Information indisponible</Text>
            </View>
          ) : (
            <View style={styles.box}>
              <MaterialIcons size={20} name="class" color="grey" />
              <Text horizontal={true} style={styles.cat}>
                Catégories :
              </Text>
              <View horizontal={true}>
                <Text style={{ paddingLeft: 10 }}> {product.categories} </Text>
              </View>
            </View>
          )}

          <View style={styles.line} />
        </ScrollView>
        <ReturnBut />
        <Camera />
      </>
    );
  }
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
