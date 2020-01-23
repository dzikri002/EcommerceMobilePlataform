//import liraries
// React native and others libraries imports
import React, { Component } from "react";

import {
  Container,
  View,
  Right,
  Button,
  Icon,
  Item,
  Input,
  Text,
  Col,
  Grid
} from "native-base";

import {
  StyleSheet,
  Alert,
  AsyncStorage,
  TextInput,
  AccessToken,
  localStorage
} from "react-native";
import Navbar from "../components/NavbarHeader";

// Tokens Validation Session
const ACCESS_TOKEN = "access_token";

// create a component
export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      UserEmail: "",
      UserPassword: "",
      idUser: "",
      nombre: "",
      apellido: "",
      direccion: "",
      dataUsuario: "",
      hasError: false,
      errorText: ""
    };
  }

  // Metodos

  /** 
async storeToken(accessToken){
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
    this.getToken();
  } catch (error) {
    console.log('Somethin went wrong');
  }
}
*/
  async getToken() {
    try {
      let token = await AsyncStorage.getItem(userId);
      console.log("Token is" + token);
    } catch (error) {
      console.log("Somethin went wrong");
    }
  }

  login() {
    this.setState({
      hasError: true,
      errorText: "Invalid username - correo or password !"
    });
  }

  clearText = () => {
    this.setState({
      UserEmail: "",
      UserPassword: ""
    });
  };

  UserLoginFunction = () => {
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;
    const idPerfil = 3;

    if (
      this.state.UserEmail === "" ||
      (this.state.UserPassword === "" && idPerfil == 3)
    ) {
      Alert.alert("Porfavor No Dejar Vacios \n" + "Los Campos Del Formato");
    } else {
      let response = fetch("http://mydigitall.com/TesisAndres/User_Login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: UserEmail,
          password: UserPassword
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson == "CamposNoCoinciden") {
            alert("CamposNoCoinciden\n" + "Intentar de Nuevo");
          } else {
            this.setState({
              dataUsuario: responseJson,
              idUser: responseJson.map(item => item.idUsuario),
              nombre: responseJson.map(item => item.nombreUsuario),
              apellido: responseJson.map(item => item.apellidoUsuario),
              direccion: responseJson.map(item => item.direccionUsuario),
              isLoading: false
            });
            console.log("Respuesta del Json Login" + responseJson);
            Alert.alert(
              "Datos Correctos \n" + this.state.nombre + "  " + "Bienvenido"
            );
            this.datosProfile();
          }
        })

        .catch(error => {
          console.error(error);
        });
    }
  };

  // Funcion de pasar datos al Profile User
  datosProfile() {
    this.props.navigation.navigate("Profile", {
      correoOBJ: this.state.UserEmail,
      passOBJ: this.state.UserPassword,

      dataU: this.state.dataUsuario,

      idU: this.state.idUser,
      nameU: this.state.nombre,
      lastNameU: this.state.apellido,
      addressU: this.state.direccion
    });
  }

  functionCombined() {
    this.UserLoginFunction();
    this.clearText();
  }

  render() {
    const { navigate } = this.props.navigation;

    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => navigate("Cart")}>
          <Icon size={38} style={{ fontSize: 38 }} name="ios-cart" />
        </Button>
      </Right>
    );

    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <Navbar right={right} title="Login" />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 50,
            paddingRight: 50,
            marginTop: 100,
            marginBottom: 50
          }}
        >
          <View style={{ marginBottom: 25, width: "100%" }}>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                textAlign: "left",
                width: "100%",
                color: "#2c3e50"
              }}
            >
              Bienvenido
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                width: "100%",
                color: "#687373"
              }}
            >
              Login para Continuar
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                width: "100%",
                color: "#687373"
              }}
            >
              Debes encontrarte Registrado en la Plataforma
            </Text>
          </View>

          <View style={{ marginBottom: 25, marginTop: 25, width: "100%" }}>
            <Item style={{ marginBottom: 25, marginTop: 25, hight: "30%" }}>
              <Icon active name="ios-person" style={{ color: "#687373" }} />
              <TextInput
                placeholder="Correo"
                onChangeText={text => this.setState({ UserEmail: text })}
                placeholderTextColor="#687373"
                value={this.state.UserEmail}
              />
            </Item>
            <Item>
              <Icon active name="ios-lock" style={{ color: "#687373" }} />
              <TextInput
                placeholder="Contraseña"
                onChangeText={text => this.setState({ UserPassword: text })}
                placeholderTextColor="#687373"
                secureTextEntry={true}
                value={this.state.UserPassword}
              />
            </Item>
          </View>
          {this.state.hasError ? (
            <Text
              style={{
                color: "#c0392b",
                textAlign: "center",
                marginTop: 10
              }}
            >
              {this.state.errorText}
            </Text>
          ) : null}

          <Grid style={{ marginTop: 20, marginBottom: 10 }}>
            <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
              <Button
                onPress={() => this.functionCombined()}
                style={{ backgroundColor: "#2c3e50", marginTop: 20 }}
              >
                <Text style={{ color: "#fdfdfd" }}>Login</Text>
              </Button>
            </Col>

            <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
              <Button
                onPress={() => navigate("Sign")}
                style={{ backgroundColor: "#2c3e50", marginTop: 20 }}
              >
                <Text style={{ color: "#fdfdfd" }}>Registro</Text>
              </Button>
            </Col>
          </Grid>
        </View>
      </Container>
    );
  }
}

// Estilos
const styles = StyleSheet.create({
  buttonsV: {
    flexDirection: "row",
    justifyContent: "center"
  }
});
