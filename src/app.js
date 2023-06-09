//En el archivo README podemos encontrar comandos para testeo.

const express = require("express"); //Importamos modulo express
const bodyParser = require("body-parser"); //Importamos middleware de express para analisis de las solicitudes entrantes HTTP
const ProductManager = require("./ProductManager-Gianluca Carminatti"); //Importamos la clase ProductManager desde nuestro archivo

const app = express(); //Creamos una instancia de nuestra app para crear rutas y manejar solicitudes entrantes
const port = 3000; // Puerto donde se ejecuta el servidor

app.use(bodyParser.json()); //Agregamos el middleware antes importados a nuestra app para poder analizar las solicitudes en formato JSON

const productManager = new ProductManager("../data/productos.json"); //Creamos una instancia de nuestra clase y pasamos como argumento nuestro archivo de productos

app.get("/products", (req, res) => {
  //Definimos la ruta products y seteamos parametro limit de consulta en la URL
  const { limit } = req.query;
  let allProducts = productManager.getAllProducts();

  if (limit) {
    allProducts = allProducts.slice(0, parseInt(limit));
  }

  res.json(allProducts);
});

app.get("/products/:pid", (req, res) => {
  //Definimos la ruta :pid que obtendra el ID correspondiente al producto
  const pid = parseInt(req.params.pid);
  const product = productManager.getProductById(pid);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.post("/products", (req, res) => {
  // Solicitud POST que recibe un objeto de producto en el cuerpo de la solicitud.
  const product = req.body;
  const newProduct = productManager.addProduct(product);
  res.json(newProduct);
});

app.put("/products/:pid", (req, res) => {
  //Solicitud PUT hacia la ruta mencionada para actualizacion de productos
  const { id } = req.params;
  const updatedFields = req.body;
  const updatedProduct = productManager.updateProduct(
    parseInt(id),
    updatedFields
  );
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.delete("/products/:pid", (req, res) => {
  //Solicitud DELETE para el product ID mencionado en la URL
  const { id } = req.params;
  const result = productManager.deleteProduct(parseInt(id));
  if (result) {
    res.json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.listen(port, () => {
  //Mensaje de aviso de puerto y URL donde corre el servidor.
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
