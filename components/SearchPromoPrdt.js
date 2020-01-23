
//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { promoPrdtComercioPrdto } from "../Api_homeData/Api_homeData";

const { width, height } = Dimensions.get("window");

// create a component
class SearchPromoPrdt extends Component {
  static navigationOptions = {
    title: "SearchPromoPrdt",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      data: "",
      dataO: ""
    };
  }

  //Data from Php file ofertas.php
  // for local Host const url = `http://192.168.0.19/TesisWeb/ofertas.php`
  componentDidMount() {
    const url = "http://mydigitall.com/TesisAndres/ofertas.php";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          //dataSource: responseJson.book_array
          // dataSource: dataN
          dataO: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // metodo de filtracion de data

  filter(text) {
    const data1 = this.state.dataO;

    // console.log(data1);

    const newData = data1.filter(function(item, id) {
      const itemData = item.nombreProducto.toUpperCase().trim();

      const textData = text.toUpperCase().trim();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text
    });
  }

  //********************************* */

  deleteData() {
    this.setState({
      text: "",
      data: ""
    });
  }

  _irDeatalles() {
    Alert.alert("Oprimido para seleccion");
  }

  _renderItem(item) {
    return (
      <TouchableOpacity onPress={this._irDeatalles}>
        <Image
          key={item.id}
          style={styles.image}
          source={{ uri: item.imagenProducto }}
        />
        <View style={styles.textCont}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {" "}
            {item.nombreProducto}
          </Text>
          <Text style={styles.textSearch}> $ {item.precioUnidadProducto}</Text>
          <Text style={styles.textSearch}> {item.nombreTienda}</Text>
          <Text style={styles.textSearch}> {item.descripcionProducto}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    console.log("El data", this.state.data);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="search"
            color="grey"
            size={18}
            style={styles.searchIcon}
          />
          <TextInput
            value={this.state.text}
            onChangeText={text => this.filter(text)}
            style={styles.input}
            placeholder="Busqueda Producto...."
            placeholderTextColor="white"
            keyboardAppearance="default"
            autoFocus={true}
          />
          {this.state.text ? (
            <TouchableWithoutFeedback onPress={() => this.deleteData()}>
              <Icon
                name="times-circle"
                color="grey"
                size={25}
                style={styles.iconInputClose}
              />
            </TouchableWithoutFeedback>
          ) : null}

          <TouchableWithoutFeedback style={styles.cancelButton}>
            <View style={styles.containerButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView>
          <FlatList
            style={{ marginHorizontal: 5 }}
            data={this.state.data}
            numColumns={3}
            columnWrapperStyle={{ marginTop: 5, marginLeft: 5 }}
            renderItem={({ item }) => this._renderItem(item)}
            keyExtractor={item => item.key}
          />
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaea"
  },
  header: {
    height: 50,
    backgroundColor: "#181818",
    borderBottomWidth: 1,
    borderColor: "#3a3a3a",
    paddingBottom: 5,

    flexDirection: "row",
    alignItems: "center",
    position: "relative"
  },
  input: {
    height: 35,
    backgroundColor: "#323232",
    width: width - width / 4,
    marginHorizontal: 10,
    paddingLeft: 30,
    borderRadius: 3
  },
  cancelButtonText: {
    color: "white"
  },
  searchIcon: {
    position: "absolute",
    top: 12,
    left: 15,
    zIndex: 1,
    backgroundColor: "transparent"
  },
  iconInputClose: {
    position: "absolute",
    top: 10,
    right: 90,
    backgroundColor: "transparent"
  },
  image: {
    marginRight: 5,
    width: 150,
    height: 170
  },
  textSearch: {
    fontSize: 15
  },
  textCont: {
    alignItems: "center",
    position: "relative"
  }
});

//make this component available to the app
export default SearchPromoPrdt;
