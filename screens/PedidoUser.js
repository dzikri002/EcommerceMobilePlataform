import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  AsyncStorage
} from "react-native";

import NavBar from "../components/NavbarHeader";
import { Left, Button, Icon, Container, Item } from "native-base";

// Unable to parse json string -> si no tiene elementos el array

// All User Paid Invoids

export default class PedidoUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idUser: this.props.navigation.state.params.id,
      dataPedido: []
    };
  }

  componentDidMount() {
    const { idUser } = this.state;
    console.log("Pedido UserId" + this.state.idUser);

    fetch("http://mydigitall.com/TesisAndres/pedidosUsuario.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idU: parseInt(idUser)
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson == "NoPedidos") {
          alert("Usuario no Cuenta\n" + "Con Pedidos");
        } else {
          this.setState({
            dataPedido: responseJson
          });
          console.log("Respuesta del Json Pedidos" + responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  // Render facturas

  totalItemPedido(data) {
    const cantidad = data.cantidadCompra;
    const precio = data.precioUnidad;
    const subtotal = precio * cantidad;
    return subtotal;
  }
  totalFactura() {
    let a = this.state.dataPedido;
    let totalP = 0;

    a.forEach(item => {
      totalP += item.cantidadCompra * item.precioUnidad;
    });
    return totalP;
  }

  facturasUsuarioList(data) {
    return (
      <View>
        <Text style={styles.description}>Pedido # {data.idPedido}</Text>
        <Text style={styles.description}>Producto: {data.nombreProducto}</Text>
        <Text style={styles.description}>
          Cantidad Compra: {data.cantidadCompra}
        </Text>
        <Text style={styles.description}>
          Comercio Compra: {data.nombreTienda}
        </Text>
        <Text style={styles.description}>
          Estado Compra: {data.pedidoEstado == 1 ? "Proceso en Linea" : "Cancelado"}
        </Text>
        <Text style={styles.description}>
          Precio Producto: {data.precioUnidad}
        </Text>
        <Text style={styles.description}>Fecha Pedido: {data.fechaPedido}</Text>

        <Text style={styles.description}>
          Total Item Pedido:
          {this.totalItemPedido(data)}
        </Text>
        <View style={styles.separator} />
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon size={38} style={{ fontSize: 38 }} name="arrow-back" />
        </Button>
      </Left>
    );

    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <NavBar left={left} title=" FacturasUsuario" />

        <View>
          <View style={styles.infoPedido}>
            <Text
              style={{
                fontSize: 40,
                color: "#696969",
                fontWeight: "600"
              }}
            >
              Mis Pedidos
            </Text>
          </View>
        </View>

        <ScrollView>
          <View>
            <FlatList
              data={this.state.dataPedido}
              renderItem={({ item }) => this.facturasUsuarioList(item)}
              keyExtractor={(item, index) => "key" + index}
            />

            <View style={styles.separator} />
          
            
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
    marginBottom: 2,
    alignItems: "center",
    height: 180
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
    marginTop: 5,
    alignItems: "center",
    padding: 10
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
