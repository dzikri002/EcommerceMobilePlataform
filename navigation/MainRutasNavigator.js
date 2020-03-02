//import liraries
import React, { Component } from "react";

// Vistas

import { createStackNavigator, createAppContainer } from "react-navigation";
import Comercios from "../screens/Comercios";
import DetallesNegocio from "../screens/DetallesNegocio";
import MainTabNavigator from "../navigation/MainTabNavigator";
import DetallesNegocioProducto from "../screens/DetallesNegocioProducto";
import shopingCart from "../components/shopingCart";
import Checkout from "../components/Checkout";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";
import ProfileUsuarioActividad from "../screens/ProfileUsuarioActividad";
import OrdenConfirmation from "../components/OrdenConfirmation";
import FacturaUser from "../screens/FacturaUser";
import PedidoUser from "../screens/PedidoUser";

// create a component
class MainRutasNavigator extends Component {
  static navigationOptions = {
    header: "none"
  };

  render() {
    return <MainNavigator />;
  }
}

const MainNavigator = createStackNavigator(
  {
    // Vistas
    Home: { screen: MainTabNavigator },
    Sign: { screen: SignUp },
    Login: { screen: Login },
    Comercios: { screen: Comercios },
    DetallesN: { screen: DetallesNegocio },
    DetallesNP: { screen: DetallesNegocioProducto },
    Cart: { screen: shopingCart },
    CheckO: { screen: Checkout },
    Profile: { screen: ProfileUsuarioActividad },
    OrdenCon: { screen: OrdenConfirmation },
    Factura: { screen: FacturaUser },
    Pedido: { screen: PedidoUser }
  },
  {
    headerMode: "null"
  }
);

//make this component available to the app
const App = createAppContainer(MainNavigator);
export default App;
//export default MainRutasNavigator;
