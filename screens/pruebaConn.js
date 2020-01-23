import React, { Component } from "react";
import { View, Text } from "native-base";
import { FlatList } from "react-native";
// "http://localhost/TesisWeb/infoProfileUser.php"
export default class pruebaConn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isLoading: true
    };
  }
  // Recibir la Data Json
  componentDidMount() {
    return fetch(`http://192.168.0.19/TesisWeb/infoComerciosProductos.php`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    console.log(this.state.dataSource);
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text>{item.nombreTienda}</Text>}
          keyExtractor={item => item.idComercio}
        />
      </View>
    );
  }
}
