const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(
  rootDir,
  'data',
  'products.json'
);

module.exports = class Cart {
    static addProduct(id){
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
        })
    }
}