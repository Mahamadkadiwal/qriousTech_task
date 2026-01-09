const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/product.controller');
const validate = require('../middlewares/validateMiddleware');
const { productSchema, updateSchema } = require('../schemas/productSchema');
const uploads = require('../middlewares/fileUploadMiddleware');

const router = express.Router();

router.get('/getProduct', getProducts);
router.get('/getProduct/:product_id', getProductById);
router.post('/createProduct', uploads.single('product_image'),validate(productSchema), createProduct);
router.patch('/updateProduct/:product_id', validate(updateSchema), updateProduct);
router.delete('/deleteProduct/:product_id', deleteProduct);

module.exports = router;