import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ success: false, error: "el token es requerido" })
  }

  if (!header.startsWith("Bearer")) {
    return res.status(401).json({ success: false, error: "el token debe ser formato jwt" })
  }

  const array = header.split(" ")

  const token = array[1]


  if (!token) {
    return res.status(401).json({ success: false, error: "token invalido" })
  }

  try {
    const verifyToken = jwt.verify(token, "contraseñasupersegura")
    next()
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export { authMiddleware }