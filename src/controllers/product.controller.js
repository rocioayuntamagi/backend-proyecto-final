import { Product } from "../models/product.model.js"

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 })
    res.json({ sucess: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error al traer los productos" })
  }
}

const createProduct = async (req, res) => {
  try {
    const body = req.body
    const { name, price, stock, category, description } = body

    if (!name) {
      return res.status(400).json({ success: false, error: "Data invalida, vuelve a intentarlo" })
    }

    const createdProduct = await Product.create({ name, price, stock, category, description })

    res.status(201).json({ success: true, data: createdProduct })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const updateProduct = async (id, updates) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })
    return { success: true, data: updatedProduct }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    return { success: true, data: deletedProduct }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export { getProducts, createProduct, updateProduct, deleteProduct }