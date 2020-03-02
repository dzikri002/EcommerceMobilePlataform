/**
 * This is the Checkout Page
 **/

// React native and others libraries imports
import React, { Component } from "react";
import { TouchableHighlight, TextInput } from "react-native";
import {
  Container,
  Content,
  View,
  Grid,
  Col,
  Left,
  Right,
  Button,
  Icon,
  List,
  ListItem,
  Body,
  Radio,
  Text
} from "native-base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Navbar from "./NavbarHeader";
import helpers from "../helpers/helpers";

// create a component
class Checkout extends Component {
  static navigationOptions = {
    header: null,
    title: "Checkout"
  };

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      isLoading: false,
      dataUser: this.props.navigation.state.params,
      idU: this.props.navigation.state.params.dataU,
      total: 0,
      date1: "",
      date2: "",
      card: true,
      paypal: false,
      cash: false,
      bitcoin: false,
      googleWallet: false,
      passW: " ",
      email: " ",
      radioButton: "TarjetaCredito",
      domicilo: ""
    };
  }

  // LogOut
  logOut() {
    this.setState({
      idU: null
    });
    alert("Saliste del Sistema");
    this.props.navigation.navigate("Home");
  }

  // Pago go to Profile and Clear ShopingCart

  clearCar() {
    helpers.removeAll(this);
    // alert("Pedido En Proceso \n" + "Espera Notificación de Compra");
    // this.props.navigation.navigate("Home");
  }

  //  this.props.navigation.navigate("Profile");
  componentDidMount() {
    const cartItems = this.props.navigation.getParam("cartItems");
    this.setState({ cartItems: cartItems });

    var granTotal = cartItems.reduce(function(accumulator, cartItems) {
      return (
        accumulator +
        parseFloat(cartItems.item.precioUnidadProducto) *
          parseInt(cartItems.Cantidad)
      );
    }, 0);

    // Set the time for check out Pedido

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      date1: date + "/" + month + "/" + year + " "
    });
    this.setState({
      //Setting the value of the date time
      date2: hours + ":" + min + ":" + sec
    });

    this.setState({ total: granTotal });
  }

  // Inico   Metodos del Render
  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem key={i} style={{ marginLeft: 0 }}>
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>
              {item.Cantidad > 1 ? item.Cantidad + "x" : null}
              {item.item.nombreProducto}
            </Text>
          </Body>
          <Right>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10
              }}
            >
              $ {item.item.precioUnidadProducto}
            </Text>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  // **********************          Info to PHP file    **********************
  // For Server Outside "http://mydigitall.com/TesisAndres/postDataInfoCheckout.php";
  // For local Server  const url = `http://192.168.0.19/TesisWeb/postDataInfoCheckout.php`
  // Funtion that send info to start the pedido process
  checkoutInfo = () => {
    const url = `http://mydigitall.com/TesisAndres/sessionUserCheckout.php`;
    // const { passW } = this.state;
    // const { email } = this.state;
    // Falta colocar el metodo de pago radioButton
    const uniqueArr = [
      ...new Set(this.state.cartItems.map(data => data.item.idComercio))
    ];

    if (this.state.idU == null) {
      alert(
        "No te Encuentras Logueado \n" +
          "Porfavor Loguearse para Continuar Procedimiento de Pago "
      );
    } else {
      // Firts fectch to obtain all the info from user
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        // Convert your array as JSON Array
        body: JSON.stringify({
          userId: this.state.idU.id.toString(),
          granTotal: this.state.total,
          date1: this.state.date1,
          date2: this.state.date2,
          carrito: this.state.cartItems,
          idComercio: uniqueArr.toString()
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // alert("Pedido En Proceso \n" + "Espera Notificación de Compra");
          console.log("RespuestaServerCarrito *---*", responseJson);
          this.props.navigation.navigate("Home");
          alert(
            "Gracias por tu compra\n" +
              "Pronto Recibiras informacion acerca de tu Pedido"
          );
          this.clearCar();
        })

        .catch(error => {
          console.log(error);
        });
    }
  };

  // Render both methods
  renderMethodsCheck() {
    this.checkoutInfo(), this.clearCar();
  }

  /**--------------------------------FinalMetodos-------------------------------------- */
  render() {
    // console.log("DesdeCheckOut El Id :", this.state.idU);
    const { navigate } = this.props.navigation;
    // const dataUserName = this.state.dataUser.dataU.name;
    // const dataUserCorreo = this.state.dataUser.dataU.email;
    // Get that Item from an Json Object
    let result = this.state.cartItems.map(a => a.item.idComercio);
    // Take duplicated values from an array
    const uniqueArr = [
      ...new Set(this.state.cartItems.map(data => data.item.idComercio))
    ];

    console.log("Desde checkOutCart --", this.state.cartItems);
    //console.log("Domicilio" + this.state.domicilo);
    // console.log("el radioButton :", this.state.radioButton);
    // console.log("Desde checkOut--", uniqueArr);
    // console.log("Desde checkOut---", this.state.dataUser.dataU);

    // const keyCount = Object.keys(this.state.dataUser.dataU).length;

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
    );

    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <Navbar left={left} title="CHECKOUT" />
        <Content padder>
          <TouchableHighlight onPress={() => navigate("LoginStack")}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#6fafc4",
                paddingTop: 20,
                paddingBottom: 20
              }}
            >
              <Icon
                name="ios-warning"
                style={{
                  color: "rgba(253, 253, 253, 0.9)",
                  marginRight: 20,
                  position: "absolute",
                  left: 11,
                  top: 15,
                  borderRightWidth: 1,
                  borderColor: "rgba(253, 253, 253, 0.2)",
                  paddingRight: 20
                }}
              />
              <Text style={{ color: "#fdfdfd", paddingLeft: 20 }}>
                Porfavor Loguear para proceder a pagar
              </Text>
            </View>
          </TouchableHighlight>

          <View>
            <Text style={{ marginTop: 15, fontSize: 24 }}>
              Shipping - Pedido - Informacion
            </Text>
          </View>

          <Text style={{ marginTop: 15, fontSize: 18 }}>Tu Orden</Text>
          <View style={styles.invoice} />

          <List>{this.renderItems()}</List>

          <View style={styles.line} />

          <Grid style={{ paddingLeft: 10, paddingRight: 10, marginTop: 7 }}>
            <Col>
              <Text style={{ fontSize: 18, fontStyle: "italic" }}>Total</Text>
            </Col>
            <Col>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                {" $ " + this.state.total}
              </Text>
            </Col>
          </Grid>

          <View>
            <Text style={{ marginTop: 15, marginBottom: 7, fontSize: 18 }}>
              Metodo de Pago
            </Text>
            <ListItem
              style={{
                borderWidth: 1,
                borderColor: "rgba(149, 165, 166, 0.3)",
                paddingLeft: 10,
                marginLeft: 0
              }}
            >
              <Text>TarjetaCredito</Text>
              <FAIcon
                name="cc-mastercard"
                size={20}
                color="#c0392b"
                style={{ marginLeft: 7 }}
              />
              <FAIcon
                name="cc-visa"
                size={20}
                color="#2980b9"
                style={{ marginLeft: 2 }}
              />
              <FAIcon
                name="cc-discover"
                size={20}
                color="#c0392b"
                style={{ marginLeft: 2 }}
              />
              <FAIcon
                name="cc-stripe"
                size={20}
                color="#2980b9"
                style={{ marginLeft: 2 }}
              />
              <Right>
                <Radio
                  selected={this.state.card}
                  onPress={() =>
                    this.setState({
                      card: true,
                      paypal: false,
                      cash: false,
                      bitcoin: false,
                      googleWallet: false,
                      radioButton: "TarjetaCredito"
                    })
                  }
                />
              </Right>
            </ListItem>
            <ListItem
              style={{
                borderWidth: 1,
                borderColor: "rgba(149, 165, 166, 0.3)",
                paddingLeft: 10,
                marginLeft: 0,
                borderTopWidth: 0
              }}
            >
              <Text>Paypal</Text>
              <FAIcon
                name="cc-paypal"
                size={20}
                color="#34495e"
                style={{ marginLeft: 7 }}
              />
              <Right>
                <Radio
                  selected={this.state.paypal}
                  onPress={() =>
                    this.setState({
                      card: false,
                      paypal: true,
                      cash: false,
                      bitcoin: false,
                      googleWallet: false,
                      radioButton: "Paypal"
                    })
                  }
                />
              </Right>
            </ListItem>
          </View>
          <ListItem
            style={{
              borderWidth: 1,
              borderColor: "rgba(149, 165, 166, 0.3)",
              paddingLeft: 10,
              marginLeft: 0,
              borderTopWidth: 0
            }}
          >
            <Text>Efectivo</Text>
            <FAIcon
              name="money"
              size={20}
              color="#34495e"
              style={{ marginLeft: 7 }}
            />
            <Right>
              <Radio
                selected={this.state.cash}
                onPress={() =>
                  this.setState({
                    card: false,
                    paypal: false,
                    cash: true,
                    bitcoin: false,
                    googleWallet: false,
                    radioButton: "Efectivo"
                  })
                }
              />
            </Right>
          </ListItem>
          <ListItem
            style={{
              borderWidth: 1,
              borderColor: "rgba(149, 165, 166, 0.3)",
              paddingLeft: 10,
              marginLeft: 0,
              borderTopWidth: 0
            }}
          >
            <Text>Bitcoin</Text>
            <FAIcon
              name="bitcoin"
              size={20}
              color="#34495e"
              style={{ marginLeft: 7 }}
            />
            <Right>
              <Radio
                selected={this.state.bitcoin}
                onPress={() =>
                  this.setState({
                    card: false,
                    paypal: false,
                    cash: false,
                    bitcoin: true,
                    googleWallet: false,
                    radioButton: "Bitcoin"
                  })
                }
              />
            </Right>
          </ListItem>
          <ListItem
            style={{
              borderWidth: 1,
              borderColor: "rgba(149, 165, 166, 0.3)",
              paddingLeft: 10,
              marginLeft: 0,
              borderTopWidth: 0
            }}
          >
            <Text>Google Wallet</Text>
            <FAIcon
              name="google-wallet"
              size={20}
              color="#34495e"
              style={{ marginLeft: 7 }}
            />
            <Right>
              <Radio
                selected={this.state.googleWallet}
                onPress={() =>
                  this.setState({
                    card: false,
                    paypal: false,
                    cash: false,
                    bitcoin: false,
                    googleWallet: true,
                    radioButton: "googleWallet"
                  })
                }
              />
            </Right>
          </ListItem>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Escribir domicilio de entrega del producto "
              placeholderTextColor="grey"
              numberOfLines={3}
              multiline={true}
              onChangeText={text => this.setState({ domicilo: text })}
            />
          </View>
          <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
            <Button
              onPress={() => this.renderMethodsCheck()}
              style={{ backgroundColor: "#00BFFF" }}
              block
              iconLeft
            >
              <Icon name="ios-card" />
              <Text style={{ color: "#fdfdfd" }}>Pagos</Text>
            </Button>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
            <Button
              onPress={() => this.logOut()}
              style={{ backgroundColor: "#00BFFF" }}
              block
              iconLeft
            >
              <Icon name="log-out" />
              <Text style={{ color: "#fdfdfd" }}>Salir</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

// define your styles
const styles = {
  invoice: {
    paddingLeft: 20,
    paddingRight: 20
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#bdc3c7"
  },
  textAreaContainer: {
    borderColor: "#bdc3c7",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start"
  }
};
//make this component available to the app
export default Checkout;
