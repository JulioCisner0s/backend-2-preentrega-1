import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import { invokePassport } from "../middlewares/handlerError.js";

const route = Router();

route.post('/login', login)
route.post('/register:', register)

route.get('/current', invokePassport('jwt'), (req, res) => {
  console.log("Usuario desde session.router ", req.user)
  res.send('Bienvenido ' + req.user.nombre)
})


export default route
