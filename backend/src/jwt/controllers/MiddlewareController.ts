import jwt from 'jsonwebtoken'
import express, { NextFunction, Request, Response } from "express"
import { userInfo } from 'os'
interface ExRequest extends Request {
  user?: any
}

class MiddlewareController {
  verifyToken = (req: ExRequest, res: Response, next: NextFunction) => {
    const token = req.headers['token'] as string
    if (token) {
      const accessToken = token.split(' ')[1]
      jwt.verify(accessToken,
        process.env.JWT_ACCESS_TOKEN,
        (err: Error, user: any) => {
          if (err) {
            return res.status(403).json('Token is not valid!')
          }
          req.user = user
          next()
        })
    }
    else {
      return res.status(401).json('You are not authenticated!')
    }
  }

  verifyToken_AdminAuth = (req: ExRequest, res: Response, next: NextFunction) => {
    this.verifyToken(req, res, () => {
      if ((req.user.id === req.params._id) || req.user.isAdmin) {
        next()
      }
      else {
        return res.status(403).json('You are not allow to delete other!')
      }
    })
  }
}

export default new MiddlewareController()