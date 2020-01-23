//import liraries
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  
} from "react-native";

import NavBar from "../components/NavbarHeader";
import { Left, Button, Icon, Container } from "native-base";

// create a component
class ProfileUsuarioActividad extends Component {
  static navigationOptions = {
    title: "Login",
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      UserEmail: this.props.navigation.state.params.correoOBJ,
      passUser: this.props.navigation.state.params.passOBJ,
      idUser: this.props.navigation.state.params.idU,
      dataUsuario: this.props.navigation.state.params.dataU,

      name: this.props.navigation.state.params.nameU,
      lastName: this.props.navigation.state.params.lastNameU,
      addresss: this.props.navigation.state.params.addressU
    };
  }

  // LogOut
  logOut() {
    this.setState({
      idUser: null
    });

    alert("Saliste del Sistema.");
    this.props.navigation.navigate("Home");
  }

  // Pass Data to shopingCart
  passData() {
    this.props.navigation.navigate("Cart", {
      id: this.state.idUser,
      email: this.state.UserEmail,
      name: this.state.name,
      pass: this.state.passUser
    });
  }

  // Pass Data to FacturaUser
  passDataFact() {
    this.props.navigation.navigate("Factura", {
      id: this.state.idUser,
      email: this.state.UserEmail,
      name: this.state.name,
      pass: this.state.passUser
    });
  }

  // Pass Data to PedidoUser
  passDataPed() {
    this.props.navigation.navigate("Pedido", {
      id: this.state.idUser,
      email: this.state.UserEmail,
      name: this.state.name,
      pass: this.state.passUser
    });
  }

  imagenUser(data) {
    const imageUri = data.imagenUsuario;

    return (
      <View>
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 10
          }}
          source={
            imageUri.length > 0
              ? { uri: imageUri }
              : require("../images/fotoNotAvailable.jpg")
          }
        />
      </View>
    );
  }
  //  this.props.imageUri      uri: imageUri
  //imageUri != null ? uri = imageUri : require("../images/fotoNotAvailable.jpg")
  userInfo(data) {
    return (
      <View>
        <Text style={styles.info}> Correo : {data.correoUsuario}</Text>
        <Text> Direccion : {data.direccionUsuario}</Text>
        <Text> Telefono : {data.telefonoUsuario}</Text>
        <Text>
          Nombre : {data.nombreUsuario} {data.apellidoUsuario}
        </Text>
      </View>
    );
  }

  // Take just the Id of the user

  render() {
    console.log("IdUsuario" + this.state.idUser);

    console.log("DataUsuario" + this.state.dataUsuario);

    const { navigate } = this.props.navigation;

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => navigate("Home")}>
          <Icon size={38} style={{ fontSize: 38 }} name="ios-home" />
        </Button>
      </Left>
    );

    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <NavBar left={left} title="Usuario Profile" />

        <View style={styles.imagen}>
          <FlatList
            data={this.state.dataUsuario}
            renderItem={({ item }) => this.imagenUser(item)}
            // keyExtractor={item => item.id}
            keyExtractor={(item, index) => "key" + index}
          />
        </View>

        <View>
          <View style={styles.bodyContent}>
            <FlatList
              data={this.state.dataUsuario}
              renderItem={({ item }) => this.userInfo(item)}
              keyExtractor={(item, index) => "key" + index}
            />
          </View>
          <View style={styles.infoPedido}>
            <Text
              style={{
                fontSize: 30,
                color: "#696969",
                fontWeight: "600"
              }}
            >
              Mis Opciones
            </Text>
          </View>
        </View>

        <ScrollView>
          <View>
            <View style={styles.separator} />
            <Button
              style={styles.buttonContainer}
              onPress={() => {
                /* 1. Navigate to the CheckO route with params */
                this.passData();
              }}
              color="#89C4F4"
            >
              <Text>Carrito Compra Productos</Text>
            </Button>
            <Button
              style={styles.buttonContainer}
              onPress={() => {
                /* 1. Navigate to the FacturaUser route with params */
                this.passDataFact();
              }}
              color="#89C4F4"
            >
              <Text>Mis Facturas</Text>
            </Button>
            <Button
              style={styles.buttonContainer}
              onPress={() => {
                /* 1. Navigate to the PedidoUser route with params */
                this.passDataPed();
              }}
              color="#89C4F4"
            >
              <Text>Mis Pedidos</Text>
            </Button>
            <Button
              style={styles.buttonContainer}
              onPress={() => {
                this.logOut();
              }}
              color="#89C4F4"
            >
              <Text>Salir</Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

// define your styles

const styles = StyleSheet.create({
  imagen: {
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 1,
    alignItems: "center",
    height: 170
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 100
  },
  separator: {
    height: 2,

    backgroundColor: "#eeeeee",
    marginTop: 10,
    marginHorizontal: 30
  },
  infoPedido: {
    paddingLeft: 15
  },

  name: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "600"
  },

  bodyContent: {
  
    alignItems: "center",
    padding: 6
  },
  name1: {
    fontSize: 30,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 20,
    color: "#00BFFF",
    marginTop: 4
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "left",
    paddingLeft: 15
  },
  buttonContainer: {
    marginTop: 10,
    height: 35,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 200,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});

//make this component available to the app
export default ProfileUsuarioActividad;
