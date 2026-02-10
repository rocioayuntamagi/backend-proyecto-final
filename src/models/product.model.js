import mongoose from "mongoose"

// contrato 
// como defina un producto es como lo voy a manipular
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  description: { type: String, default: "Sin descripción" },
  category: { type: String, default: "Sin categoria" }
}, {
  versionKey: false
})

const Product = mongoose.model("Product", ProductSchema)

export { Product }