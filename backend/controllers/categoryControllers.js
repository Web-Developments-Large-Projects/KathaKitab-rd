import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import Product from '../models/productModel.js'

//@desc     Create a new category
//@route    POST /api/users
//@access   Private / Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  const categoryExists = await Category.findOne({ name })

  if (categoryExists) {
    res.status(400)
    throw new Error('Category already exists')
  }

  const category = await Category.create({ name })

  if (category) {
    res.status(201).json({
      _id: category._id,
      name: category.name,
    })
  } else {
    res.status(400)
    throw new Error('Invalid category data')
  }
})

//@desc     Get all categories
//@route    GET /api/categories/
//@access   Private / Admin
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})

  if (categories) {
    res.json(categories)
  } else {
    res.status(404)
    throw new Error('Categories not found')
  }
})

//@desc     Get a category by id
//@route    GET /api/categorys/:id
//@access   Private / Admin
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

//@desc     update a category by id
//@route    PUT /api/categories/:id
//@access   Private / Admin
export const updateCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  const { name } = req.body
  if (!name) {
    res.status(400)
    throw new Error('Update input invalid or empty')
  }

  category.name = name

  if (category) {
    const updatedCategory = await category.save()

    if (updatedCategory) {
      res.json(category)
    } else {
      res.status(400)
      throw new Error('Category not updated')
    }
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

//@desc     Delete a category by id
//@route    DELETE /api/categories/:id
//@access   Private / Admin
export const deleteCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await category.remove()
    res.json({ message: 'Category removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})
