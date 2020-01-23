//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import ListPanel from "../components/ListPanel";
import GridProductThumb from "../components/product/GridProductThumb";
import Grid from "../components/Grid";
import Container from "../components/Container";
import { SearchBar } from "react-native-elements";
import Navbar from "../components/NavbarHeader";
import { Right, Left, Button, Icon } from "native-base";

// create a component
class DetallesNegocio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombreComercio: this.props.navigation.state.params.item.nombreTienda,
      text: " ",
      data: " ",
      dataR: []
    };
  }

  //  For local Host const url = `http://192.168.0.19/TesisWeb/infoComerciosProducto.php`
  // Problemas: no escoge el comercio que es solicitado el query con comercio 1
  componentDidMount() {
    const { nombreComercio } = this.state;
    console.log("desde compount", nombreComercio);
    fetch("http://mydigitall.com/TesisAndres/infoComerciosProducto.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombreComercio: nombreComercio
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataR: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  static navigationOptions = {
    header: null,
    title: "DetallesNegocios"
  };

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}
        onPress={() => navigate("DetallesNP", { item: item })}
      >
        <Grid>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.imagenProducto }}
            key={item.idProducto}
          />
          <View>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>
              {item.nombreProducto}
            </Text>

            <Text style={{ fontSize: 15, marginBottom: 20 }}>
              $ {item.precioUnidadProducto}
            </Text>
          </View>
        </Grid>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return (
      <View style={{ height: 3, width: "100%", backgroundColor: "black" }} />
    );
  };

  render() {
    console.log("Desde Detalles", this.state.nombreComercio);
    console.log("Desde Detalles", this.state.dataR);
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { idComercio } = params.item;
    const { imagenComercio } = params.item;
    const { nombreTienda } = params.item;

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon name="arrow-back" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );

    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => navigate("Cart")}>
          <Icon name="ios-cart" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Right>
    );

    return (
      <Container>
        <Navbar left={left} right={right} title="DetalleComercio" />
        <Image style={styles.image} source={{ uri: imagenComercio }} />
        <Text style={styles.textTitle}>{nombreTienda} Productos </Text>

        <ScrollView>
          <View>
            <FlatList
              style={{
                marginHorizontal: 5,
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5
              }}
              data={this.state.dataR}
              numColumns={3}
              columnWrapperStyle={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5
              }}
              renderItem={this.renderItem}
              keyExtractor={item => item.idProducto}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

// define your styles

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 170,
    margin: 5,
    justifyContent: "center"
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 10
  },
  textSumary: {
    fontSize: 20,
    fontWeight: "300",
    marginLeft: 10,
    marginBottom: 10
  },

  textRimagen: {
    fontSize: 25,
    fontWeight: "400",

    flex: 1,
    justifyContent: "center",
    marginLeft: 5
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 10,
    marginHorizontal: 30
  }
});

//make this component available to the app
export default DetallesNegocio;
