import { connect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const URI_DB = process.env.URI_DB

const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log("✅ Conectado con éxito a Mongodb")
  } catch (error) {
    console.log("❌ No se pudo conectar con la base de datos :(")
  }
}

export { connectDb }