// toma el input del usuario
// sanitiza los datos
// responde al usuario (éxito o de no éxito)
// el controlador resuelve LA LÓGICA DE NEGOCIO

import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"

const register = async (req, res) => { 
  try {
    const body = req.body

    const { email, password } = body

    // implementar validaciones de input con ZOD
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "data invalida, revisa los datos compartidos" })
    }

    if (!email.includes("@")) {
      return res.status(400).json({ success: false, error: "el correo electronico debería ser un email valido" })
    }

    if (password.length < 4) {
      return res.status(400).json({ success: false, error: "la contraseña debe contar al menos con 4 caracteres" })
    }

    const hash = await bcryptjs.hash(password, 10)

    const newDataUser = {
      email: email,
      password: hash
    }

    const newUser = await User.create(newDataUser)
    res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
}

export { register }