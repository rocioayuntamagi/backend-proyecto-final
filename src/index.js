import express from "express"
import cors from "cors"
import { connectDb } from "./config/mongodb.js"
import { productRouter } from "./routes/productsRouter.js"
import { authRouter } from "./routes/authRouter.js"
import { authMiddleware } from "./middleware/authMiddleware.js"
import dotenv from "dotenv"

dotenv.config()

const serverHttp = express()

// middleware
serverHttp.use(cors())
serverHttp.use(express.json())

// GET - http://localhost:50000/products

serverHttp.use("/products", authMiddleware, productRouter)
serverHttp.use("/auth", authRouter)

// error 404
serverHttp.use((req, res) => {
  res.status(404).json({ success: false, error: "el recurso no se encuentra" })
})

const PORT = process.env.PORT

// 0 - 65656
serverHttp.listen(PORT, () => {
  console.log(`✅ Servidor http en escucha en el puerto http://127.0.0.1:${PORT}`)
  connectDb()
})