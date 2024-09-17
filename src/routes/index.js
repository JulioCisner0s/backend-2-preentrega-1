import { Router } from "express";
import { ROUTE_PATH } from "../constants/routesPath.js";
import SessionsRouter from './sessions.route.js'

const app = Router()

app.use(ROUTE_PATH.api_sessions, SessionsRouter)


export default app
