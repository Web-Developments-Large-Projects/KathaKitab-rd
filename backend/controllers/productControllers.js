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
  const { image: productImage } = await Product.findById(req.params.id)

  if (productImage) {
    res.json(productImage)
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
