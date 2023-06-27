import ProductsRouter from './product'
import AuthRouter from '../jwt/routes/auth'
import UserRouter from '../jwt/routes/user'
import express, { Router } from 'express'

const router: Router = express.Router();

export default (app: any) => {
  app.use('/product', ProductsRouter)
  app.use('/v1/auth', AuthRouter)
  app.use('/v1/user', UserRouter)
}
