const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const { get } = require('http');

const p = path.join(rootDir, 'data', 'products.json');

const getProductFromJson = cb => {
    fs.readFile(p, (err, fileContent) => {
    if(err){
        cb([]);
    } else{
        cb(JSON.parse(fileContent))
    }
})
}
module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
        getProductFromJson(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            });
        })
    }

    static fetchAll(cb){
        getProductFromJson(cb);
    }

    static findById(id, cb){
        getProductFromJson(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
}