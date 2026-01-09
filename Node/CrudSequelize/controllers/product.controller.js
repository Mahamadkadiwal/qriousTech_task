const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");

exports.getProducts = asyncHandler(async (req, res) => {
    const product = await Product.findAll();
    res.status(200).json(product);
})

exports.createProduct = asyncHandler(async(req, res) => {
    const {name, description, price} = req.body;

    if (!req.file) {
        return res.status(400).json({
        message: "Product image is required"
        });
    }

    const product_image = req.file.path;
    

    const product = await Product.create({ name, description, price, product_image});

    res.status(201).json({
        message: 'Product Created',
        product
    })
})

exports.updateProduct = asyncHandler(async (req, res) => {
    const {name, description, price} = req.body;
    const {product_id} = req.params;

    if(name === undefined && description === undefined && price === undefined){
        return res.status(400).json({
            error: 'At least one field is required',
            allowed : ['name', 'description', 'price']
        });
    }

    // validate the id
    const product = await Product.findByPk(product_id);
    if(!product){
        res.status(400).json({
            error: "Product not found",
            product_id
        })
    }

    const updateData = {};
    if(name !== undefined ) updateData.name = name.trim();
    if(description !== undefined) updateData.description = description.trim();
    if(price !== undefined) updateData.price = price;

    // update
    await product.update(updateData);

    // fetch product after update
    const updatedProduct = await Product.findByPk(product_id);

    res.status(200).json({
        message: 'Product updated',
        data: {
            product_id: updatedProduct.product_id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price
        }
    })
})

exports.deleteProduct = asyncHandler(async (req, res) => {
    const {product_id} = req.params;

    const product = await Product.findByPk(product_id);

    if(!product){
        res.status(400).json({
            message: "product not found",
            product_id: product_id
        })
    }

    await product.destroy(product_id);

    res.status(200).json({
        message: 'product deleted',
        product_id: product_id
    })
})

exports.getProductById = asyncHandler(async (req, res) => {
    const {product_id} = req.params;

    const product = await Product.findByPk(product_id);

    res.status(200).json({
        message: 'product fetched successfully',
        product
    })
})