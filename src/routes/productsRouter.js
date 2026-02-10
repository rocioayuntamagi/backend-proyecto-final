import { Router } from "express"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js"

const productRouter = Router()

// todas las peticiones que ingresan a productRouter, empiezan con: http://localhost:50000/products/
// PATCH http://localhost:50000/products/696047065af1ccda8cdaf5a2
productRouter.get("/", getProducts)
productRouter.post("/", createProduct)

productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const response = await deleteProduct(id)
  if (!response.success) {
    return res.status(400).json(response)
  }
  res.status(200).json(response)
})

productRouter.patch("/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body
  const response = await updateProduct(id, body)
  if (!response.success) {
    return res.status(400).json({ success: false, error: response.error })
  }
  res.json(response)
})

export { productRouter }