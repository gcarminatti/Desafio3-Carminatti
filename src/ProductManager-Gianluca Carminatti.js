//En el archivo README podemos encontrar comandos para testeo.

const fs = require("fs");

class ProductManager {
  //Creamos constructor que recibe el path que es la ruta hacia el archivo.
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts(); //LLamamos el metodo loadProducts para cargar los productos desde el inicio.
  }

  addProduct(product) {
    //Generamos y guardamos productos usando uso del metodo push.
    const newProduct = {
      id: this.generateProductId(),
      ...product,
    };

    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id); //Buscamos producto en base al ID que le pasamos como parametro
  }

  getAllProducts() {
    return this.products; // Retornamos todos los productos
  }

  updateProduct(id, updatedFields) {
    //Actualizamos el producto mediante id(de ser incorrecto , retornamos null) y un objeto con los valores correspondientes a cual podemos invocar.
    const product = this.getProductById(id);

    if (product) {
      Object.assign(product, updatedFields);
      this.saveProducts(); // Guardamos los productos actualizados.
      return product;
    }

    return null;
  }

  deleteProduct(id) {
    //Removemos archivo utilizando el metodo splice , no supe una forma de utilizar unlink para este cometido, intente pero no me funciono
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }

    return false;
  }

  generateProductId() {
    //Chequeamo si esta vacio el carrito/archivo , de estar vacio devolvemos 1 como el primer ID
    if (this.products.length === 0) {
      return 1;
    }

    const lastProductId = this.products[this.products.length - 1].id; //Obtenemos el ultimo ID usando el indice -1 y le sumamos 1
    return lastProductId + 1;
  }

  saveProducts() {
    // Convertimos a Json y guardamos utilizando el archivo especificado en this.path
    const data = JSON.stringify(this.products, null, 2);

    fs.writeFileSync(this.path, data, "utf8");
  }

  loadProducts() {
    //Cargamos el archivo desde el inicio con readFileSync y en caso de no existir mostramos un arreglo vacio
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }
}

module.exports = ProductManager;
