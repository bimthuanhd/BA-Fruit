import express, { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from "../models/User"
import { equal } from "assert"

class UserController {
  getUsers_neqDelete = async (req: Request, res: Response) => {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  getUser = async (req: Request, res: Response) => {
    try {
      const product = await User.findOne({
        _id: req.params._id
      })
      res.json(product)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      // await User.delete({ _id: req.params._id })
      const user = await User.findOne({ _id: req.params._id })
      return res.status(200).json('Delete successfully')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

}

export default new UserController()