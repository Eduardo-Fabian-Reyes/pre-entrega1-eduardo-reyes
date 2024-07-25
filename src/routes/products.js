const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Lo sentimos, producto no encontrado');
    }
});

router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({error: 'Producto no encontrado'});
    }
});

router.delete('/:pid', async (req, res) => {
    const deletedProduct = await productManager.deleteProduct(parseInt(req.params.pid));
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({error: 'Producto no encontrado'});
    }
});

module.exports = router;