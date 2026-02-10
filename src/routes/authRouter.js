import { Router } from "express"
import { login, register } from "../controllers/auth.controller.js"

const authRouter = Router()

// todas las peticiones que ingresan a productRouter, empiezan con: /auth
// http://localhost:50000/auth/register
// petición de registrar usuario
authRouter.post("/register", register)

// petición de logear usuario
authRouter.post("/login", login)

export { authRouter }