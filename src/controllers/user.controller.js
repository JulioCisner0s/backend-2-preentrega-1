//endpoints login y register:
import { UserModel } from "../models/user.model.js";
import { createHash, generadorToken, isValidPassword } from "../utils.js";

export const login = async (req, res) => {

  try {
    const { password, email } = req.body;
    const userFound = await UserModel.findOne({ email }).lean()

    if (isValidPassword(userFound, password)) {
      const token = generadorToken({ email: userFound.email, nombre: userFound.nombre, rol: userFound.rol })
      return res.status(200).cookie('cookieUser', token, { maxAge: 60000, signed: true, httpOnly: true }).json({ message: 'login OK', token })
    }
    return res.status(200).json({ message: 'error login' })
  } catch (e) {
    return res.json({ message: e })
  }
}

//para crear un usuario no es necesario asignarle el cart:id:
export const register = async (req, res) => {
  try {
    const { nombre, apellido, email, edad, password, rol } = req.body;
    //verificar si existe el usuario antes de crearlo:
    const userFound = await UserModel.findOne({ email }).lean();
    if (userFound) {
      return res.status(400).json({ message: 'usuario ya existe' })
    }

    const newUser = {
      nombre,
      apellido,
      email,
      edad,
      password: createHash(password),
      rol,
    }

    const user = await UserModel.create(newUser);
    return res.status(201).json({ message: "Usuario creado", user })//devuelve todos los datos de user
    /* return res.status(201).json({ message: `Usuario creado: ${user.nombre}` }) //devuelve solo el nombre */
  } catch (e) {
    return res.status(500).json({ message: "Error de registro", e })
  }
}
