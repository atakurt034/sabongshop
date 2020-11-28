import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import colors from 'colors'

//@desc Fetch all products
//@desc Get /api/products
//@desc Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

//@desc Fetch product by id
//@desc Get /api/products/:id
//@desc Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json('Product not found'.red.bold)
    }
  })
)

export default router
