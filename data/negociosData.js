// https://stackoverflow.com/questions/45018338/javascript-fetch-api-how-to-save-output-to-variable-as-an-object-not-the-prom
/******************* Informacion sobre cada uno de los comercios y sus productos *******************/
var url = `http://192.168.0.19/TesisWeb/infoComerciosProductos.php`;
/**  One Way to get Api Data
 * 
var fetchData = fetch(url)
  .then(response => response.json())
  .then(data => {
    //  console.log("Desde NegociosData-Api",data); // Prints result from `response.json()` in getRequest
    var Data = [];
    Data = data;
    const mappingFunction = p => p.nombreTienda;
    const Data1 = Data.map(mappingFunction);
   // console.log(Data);
  })
  .catch(error => console.error(error));


/** 


var Data = []; 
fetch(url)
    .then(res => res.json())
    .then(data => (Data = data))

    // .then(() => console.log(comercio))
    .catch(function(error) {
      console.log("Request failed", error);
    });



  */

const negocioData1 = [
  {
    key: {},
    title: {},
    summary: {},

    image: {},
    products: {
      titulo: {},
      descripcion: {},
      items: [
        {
          id: {},
          nombreLocal: {},
          name: {},
          quantity: {},
          detail: {},

          imageUri: {},

          prize: {}
        }
      ]
    }
  }
];

const negocioData = [
  /** COMERCIO # 1 */

  {
    key: 1,
    title: "Restaurante Pepe",
    summary: "Comidas tradicionales Colombianas y comidas rapidas ",

    image:
      "https://imagenes.paginasamarillas.es/restaurant-leon/fotos/417/797/74N/004/restaurant-leon-fachada-01.jpg",
    products: {
      titulo: "Comidas",
      descripcion: "Comidas Economicas",
      items: [
        {
          id: 1,
          nombreLocal: "Restaurante Pepe",
          name: "Bandeja Paisa",
          quantity: 8,
          detail:
            "Arroz blanco, Carne de res molida sudada o asada. Chicharrón,Huevo frito,Tajadas de plátano maduro o Patacón,Chorizo antioqueño con limón,Arepa antioqueña,Hogao Con tomate y cebolla.",
          imageUri:
            "http://hablemosdeculturas.com/wp-content/uploads/2017/11/comida-tipica-de-colombia-2.png",
          prize: 12000
        },
        {
          id: 2,
          nombreLocal: "Restaurante Pepe",
          name: "Ajiaco",
          quantity: 4,
          detail:
            "800 g de papas criollas, peladas y cortadas en rodajas. 500 g de papas sabaneras peladas y cortadas en rodajas. 2 tallos de cebolla larga sin cortar, solo la parte blanca. 1 ramo de guascas. 250 ml o una taza de crema de leche.40 ml o dos cucharadas de aceite de girasol. Sal y pimienta al gusto.",
          imageUri:
            "https://i2.wp.com/res.cloudinary.com/aleteia/image/fetch/c_fill,g_auto,w_620,h_310/https://aleteiaspanish.files.wordpress.com/2017/09/web3-south-american-cuisine-ajiaco-soup-close-up-in-a-bowl-on-the-table-shutterstock_476699044.jpg%3Fw%3D1200?quality=100&strip=all&ssl=1",
          prize: 10000
        },
        {
          id: 3,
          nombreLocal: "Restaurante Pepe",
          name: "Lechona",
          quantity: 6,
          detail:
            "lechona o cochinillo. 5 kilos de carne picada de cerdo. Kilo y medio de arveja cocida. Kilo y medio de papas.Un kilo de arroz blanco. Seis cebollas largas(tallo incluido)Jugo de naranja o limón.",
          imageUri:
            "http://hablemosdeculturas.com/wp-content/uploads/2017/11/comida-tipica-de-colombia-5.jpg",
          prize: 6000
        },
        {
          id: 4,
          nombreLocal: "Restaurante Pepe",
          name: "Perro Caliente",
          quantity: 4,
          detail:
            "Salchichas sabaneras partidas por la mitad con Coloca y  el ketchup,mostaza,cebolla,papitas,tocineta",
          imageUri:
            "https://media.istockphoto.com/photos/tasty-hot-dog-with-sauces-and-toppings-picture-id905001406",
          prize: 5000
        }
      ]
    }
  },

  /** COMERCIO # 2 */

  {
    key: 2,
    title: "Antinos",
    summary:
      "Restaurante de comidas tradicionales y rapidas para toda la familia",

    image:
      "http://mydigitall.com/TesisAndres/imagenesProyecto/imagenComercio/antinos.jpg",
    products: {
      titulo: "Comidas deliciosas",
      descripcion: "Comidas cocinadas en casa",
      items: [
        {
          id: 1,
          nombreLocal: "Antinos",
          name: "Empanadas",
          quantity: 12,
          detail: " Deliciosas empanadas de de res",
          imageUri:
            "https://www.divinacocina.es/wp-content/uploads/empanadillas-de-pollo-al-curry.jpg",
          prize: 5000
        },
        {
          id: 2,
          nombreLocal: "Antinos",
          name: "Desayuno",
          quantity: 8,
          detail: "Desayuno preparado con huevos salchichas",
          imageUri:
            "https://okdiario.com/img/recetas/2016/12/14/desayuno-ingles-01.jpg",
          prize: 8000
        },
        {
          id: 3,
          nombreLocal: "Antinos",
          name: "Galletas",
          quantity: 4,
          detail: "Galletas de chocolate",
          imageUri:
            "https://www.elmejornido.com/sites/default/files/136102lrg.jpg",
          prize: 8000
        },
        {
          id: 4,
          nombreLocal: "Antinos",
          name: "Gaseoas",
          quantity: 8,
          detail: "Gaseosas de todos los sabores",
          imageUri:
            "https://www.cocacoladeperu.com.pe/content/dam/journey/pe/es/private/historias/bienstar/portafolio-PE.rendition.598.336.jpg",
          prize: 1500
        },
        {
          id: 5,
          nombreLocal: "Antinos",
          name: "Papas Fritas",
          quantity: 8,
          detail: "Exquisitas Papas fritas",
          imageUri:
            "https://img.vixdata.io/pd/jpg-large/es/sites/default/files/batata-frita-07.17-1400x800.jpg",
          prize: 15000
        },
        {
          id: 5,
          nombreLocal: "Antinos",
          name: "Perro Caliente",
          quantity: 8,
          detail: "Perros calientes con los mejores topings",
          imageUri:
            "https://img.chilango.com/2018/07/los-10-mejores-hot-dogs-de-la-cdmx-1.jpg",
          prize: 15000
        },
        {
          id: 6,
          nombreLocal: "Antinos",
          name: "Jugos",
          quantity: 8,
          detail: "Jugos de todos los sabores",
          imageUri:
            "https://www.bbcgoodfood.com/sites/default/files/guide/guide-image/2017/06/juice-diet-main-image-700-350.jpg",
          prize: 1500
        }
      ]
    }
  }
];

export default negocioData;
