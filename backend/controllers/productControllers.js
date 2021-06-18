import fs from 'fs'
import asyncHandler from 'express-async-handler'
import formidable from 'formidable'
import Product from '../models/productModel.js'

//@desc     Create a new product
//@route    POST /api/products
//@access   Private / Admin
export const createProduct = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' })
    }

    const { name, description, price, category, quantity, shipping, image } =
      fields

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({ error: 'Invalid or empty fields' })
    }

    let product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      image,
    })

    //1kb= 1000
    //1mb= 1000000

    //images being sent from frontend
    if (files.image) {
      // console.log('FIles image', files.image)
      if (files.image.size > 1000000) {
        return res
          .status(400)
          .json({ error: 'Image sholud be less than 1mb in size' })
      }

      product.image.data = fs.readFileSync(files.image.path)
      product.image.contentType = files.image.type
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: 'Invald product data' })
      }
      res.status(201).json(product)
    })
  })
}

// export const createProduct = asyncHandler(async (req, res) => {
//   const { name, description, price, category, quantity, image, shipping } =
//     req.body

//   const form = new formidable.IncomingForm()
//   form.keepExtension = true
//   form.parse(req, (error, fields, files) => {
//     if (error) {
//       res.status(400)
//       throw new Error('Image could not be uploaded')
//     }

//     const product= new Product
//   })

//   const product = await Product.create({
//     name,
//     description,
//     price,
//     category,
//     quantity,
//     image,
//     shipping,
//   })

//   if (product) {
//     res.status(201).json(product)
//   } else {
//     res.status(400)
//     throw new Error('Invalid product data')
//   }
// })

//@desc     Get all products
//@route    GET /api/products/
//@access   Private / Admin
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

//@desc     Get a product (except image) by id
//@route    GET /api/products/:id
//@access   Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).select('-image')

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

//@desc     Get only product image by id
//@route    GET /api/products/:id/image
//@access   Public
export const getProductImageById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product.image.data) {
    res.set('Content-Type', product.image.contentType)
    res.send(product.image.data)
  } else {
    res.status(404)
    throw new Error('Iroduct image not found')
  }
})

//@desc     Update product by id
//@route    PUT /api/products/:id
//@access   Private / Admin
export const updateProductById = asyncHandler(async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' })
    }

    const { name, description, price, category, quantity, shipping, image } =
      fields

    if (
      !name &&
      !description &&
      !price &&
      !category &&
      !quantity &&
      !shipping
    ) {
      return res.status(400).json({ error: 'No fields given to update' })
    }

    const product = await Product.findById(req.params.id)
    product.name = name || product.name
    product.description = description || product.description
    product.price = price || product.price
    product.category = category || product.category
    product.quantity = quantity || product.quantity
    product.shipping = shipping || product.shipping

    //1kb= 1000
    //1mb= 1000000

    //images being sent from frontend
    if (files.image) {
      // console.log('FIles image', files.image)
      if (files.image.size > 1000000) {
        return res
          .status(400)
          .json({ error: 'Image sholud be less than 1mb in size' })
      }

      product.image.data = fs.readFileSync(files.image.path)
      product.image.contentType = files.image.type
    }

    const updatedProduct = await product.save()

    if (updatedProduct) {
      res.status(201).json(product)
    } else {
      return res.status(400).json({ error: 'Product not updated' })
    }
  })
})

//@desc     Delete product by id
//@route    Delete /api/products/:id
//@access   Private / Admin
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not deleted or not found')
  }
})

// products based on sell and arrival

// by sell = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=asc&limit=5
// if no params are sent, all products are returned

//@desc     Get products with queries
//@route    GET /api/products?sortBy=sold&order=desc&limit=4
//@access   Public
export const getProductsBySell = asyncHandler(async (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 10

  const products = await Product.find({})
    .select('-image')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)

  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

// products based on related products
// products with same category

// by related = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=asc&limit=5
// if no params are sent, all products are returned

//@desc     Get related products by id
//@route    GET /api/products/:id?limit=4
//@access   Public
export const getRelatedProductsById = asyncHandler(async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10

  const selectedProduct = await Product.findById(req.params.id)

  const products = await Product.find({
    _id: { $ne: selectedProduct },
    category: selectedProduct.category,
  })
    .limit(limit)
    .populate('category', '_id name')
    .select('-image')

  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

//@desc     Get related products category
//@route    GET /api/products/categories
//@access   Public
export const getProductsCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category', {})

  if (categories) {
    res.json(categories)
  } else {
    res.status(404)
    throw new Error('Categories not found')
  }
})

//@desc     Get products by search
//@route    POST /api/products/search
//@access   Public
export const getProductsbySearch = asyncHandler(async (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 10
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte = greater than pracie (0-10)
        // lte = less than

        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }
  console.log('heer')
  const products = await Product.find(findArgs)
    .select('-image')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)

  if (products) {
    res.json({ length: products.length, products })
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})
