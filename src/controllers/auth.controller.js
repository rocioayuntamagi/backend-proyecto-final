// el controlador resuelve LA LÓGICA DE NEGOCIO
// toma el input del usuario
// sanitiza los datos
// responde al usuario (éxito o de no éxito)

import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
  try {
    const body = req.body

    const { email, password } = body

    // implementar validaciones de input con ZOD
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "data invalida, revisa los datos compartidos" })
    }

    // gabi3@gmail.com
    if (!email.includes("@") || !email.endsWith(".com")) {
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
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Email ya existente en nuestra base de datos" })
    }
    res.status(500).json({ success: false, error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const body = req.body
    const { email, password } = body

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "data invalida, ingrese los datos requeridos" })
    }

    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(401).json({ success: false, error: "desautorizado" })
    }

    // const validatePassword = await bcryptjs.compare(password, foundUser.password)
    const validatePassword = await bcryptjs.compare(password, foundUser.password)

    if (!validatePassword) {
      return res.status(401).json({ succes: false, error: "desautorizado" })
    }

    // generar un token (cupón especial)
    // Un token es una llave digital o un fragmento de información que sirve para autenticar y autorizar a un usuario en sistemas digitales

    const payload = { _id: foundUser._id, username: foundUser.username, email: foundUser.email }
    const token = jwt.sign(payload, "contraseñasupersegura", { expiresIn: "10s" })
    res.json({ success: true, data: token })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export { register, login }