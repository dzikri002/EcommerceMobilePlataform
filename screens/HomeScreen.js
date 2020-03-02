//import libraries
import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text
} from "react-native";

import Container from "../components/Container";
import ListPanel from "../components/ListPanel";
import SwiperProductThumb from "../components/product/SwiperProductThumb";
import GridProductThumb from "../components/product/GridProductThumb2";
import Swiper from "../components/Swiper";
import Grid from "../components/Grid";

//import promociones from "../data/promoProducData";
import CarouselC from "../components/CarouselC";

import SearchPromo from "../components/SearchPromoPrdt";
var { height, width } = Dimensions.get("window");
const initWidth = width;
const initHeight = initWidth * (500 / 900);

//<SearchPromo />

// create a component
class HomeScreen extends Component {
  static navigationOptions = {
    title: "HomeScreen",
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentDidMount() {
    const url = "http://mydigitall.com/TesisAndres/ofertas.php";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // For local host const url = `http://192.168.0.19/TesisWeb/ofertas.php`
  /**     {this._renderPromotionsList(promociones.Comida)}
          {this._renderPromotionsList(promociones.Ropa)} */

  //                     METODOS DEL PROGRAMA

  // _renderSwiperList(data) {
  //   return (
  //     <ListPanel title={data.title} description={data.description}>
  //       <Swiper>
  //         {data.items.map((item, idx) => {
  //           return <SwiperProductThumb key={idx} {...item} />;
  //         })}
  //       </Swiper>
  //     </ListPanel>
  //   );
  // }

  // _renderGridList(data) {
  //   return (
  //     <ListPanel title={data.title} description={data.description}>
  //       <Grid>
  //         {data.items.map((item, idx) => {
  //           return <GridProductThumb key={idx} {...item} />;
  //         })}
  //       </Grid>
  //     </ListPanel>
  //   );
  // }

  /** Metodo que retrive la informacion de las promociones de los
locales*/

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          marginBottom: 10
        }}
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
              {item.nombreTienda}
            </Text>
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
      <View style={{ height: 2, width: "100%", backgroundColor: "black" }} />
    );
  };

  render() {
    return (
      <Container>
        <ScrollView>
          <SearchPromo navigation={this.props.navigation} />
          <View style={{ height: 230 }}>
            <CarouselC />
          </View>

          <Text
            style={{
              fontWeight: "bold",
              marginTop: 5,
              marginBottom: 5,
              fontSize: 25,
              marginLeft: 60
            }}
          >
            Promociones del dia
          </Text>
          <View>
            <FlatList
              style={{
                marginHorizontal: 5,
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5
              }}
              data={this.state.data}
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

const styles = StyleSheet.create({});

//make this component available to the app
export default HomeScreen;
