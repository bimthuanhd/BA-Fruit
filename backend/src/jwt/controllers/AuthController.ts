import express, { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User"
import { userRoleUtil } from "@bimdev/react-component"
import { env } from "process"
import { error } from "console"

let refreshTokens: string[] = []

class AuthController {
  registerUser = async (req: Request, res: Response) => {
    try {
      const salt: string = await bcrypt.genSalt(10)
      const hashed: string = await bcrypt.hash(req.body.password, salt)
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      })

      const isUsernameTaken = await (User as any).isUsernameTaken(req.body.username)
      const isEmailTaken = await (User as any).isEmailTaken(req.body.email)
      if (isUsernameTaken) {
        return res.status(404).json('Username already taken.')
      }
      if (isEmailTaken) {
        return res.status(404).json('Email already taken.')
      }

      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  generateAccessToken = (user: any) => {
    return jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin
    },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: '20s' }
    )
  }

  generateRefreshToken = (user: any) => {
    return jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin
    },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: '365d' }
    )
  }

  loginUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (!user) {
        return res.status(404).json('Wrong username!')
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword) {
        return res.status(404).json('Wrong password!')
      }
      if (user && validPassword) {
        const accessToken: string = this.generateAccessToken(user)
        const refreshToken: string = this.generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          // secure: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        })
        const { password, ...others } = user.toObject()

        return res.status(200).json({ ...others, accessToken })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // Su dung REDIS de luu accessToken
  requestRefreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(500).json('You are not authenticated!')
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(500).json('RefreshToken is not valid!')
    }
    jwt.verify(refreshToken,
      process.env.JWT_REFRESH_TOKEN,
      (err: Error, user: any) => {
        if (err) {
          console.log(err)
        }
        refreshTokens = refreshTokens.filter(token => token !== refreshToken)
        const newAccessToken: string = this.generateAccessToken(user)
        const newRefreshToken: string = this.generateRefreshToken(user)  
        refreshTokens.push(newRefreshToken)
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        })
        res.status(200).json({ accessToken: newAccessToken })
      })
  }

  logoutUser = async (req: Request, res: Response) => {
    res.clearCookie('refreshToken')
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
    res.status(200).json('Logout successsfully')
  }
}

export default new AuthController()