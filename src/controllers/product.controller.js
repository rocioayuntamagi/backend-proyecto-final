import { Product } from "../models/product.model.js"

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 })
    res.json({ sucess: true, data: products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message })
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

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    const updates = req.body

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para actualizar" })
    }

    res.json({ success: true, data: updatedProduct })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para borrar" })
    }
    res.json({ success: true, data: deletedProduct })
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, error: "ID incorrecto, ingresa un valor valido" })
    }
    res.status(500).json({ success: false, error: error.message })
  }
}

export { getProducts, createProduct, updateProduct, deleteProduct }