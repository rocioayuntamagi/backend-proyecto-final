import express from "express"
import cors from "cors"
import { connectDb } from "./config/mongodb.js"
import { productRouter } from "./routes/productsRouter.js"
import { authRouter } from "./routes/authRouter.js"

const serverHttp = express()

serverHttp.use(cors())
serverHttp.use(express.json())

serverHttp.use("/products", productRouter)
serverHttp.use("/auth", authRouter)

serverHttp.use((req, res) => {
  res.status(404).json({ success: false, error: "el recurso no se encuentra" })
})

const PORT = 50000

// 0 - 65656
serverHttp.listen(PORT, () => {
  console.log(`✅ Servidor http en escucha en el puerto http://127.0.0.1:${PORT}`)
  connectDb()
})