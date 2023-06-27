import express, { Request, Response } from "express"
import User from "../models/User"

class UserController {
    getUsers_neqDelete = async (req: Request, res: Response) => {
        try {
            const users = await User.find({})
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({
                _id: req.params._id
            })
            res.json(user)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    createUser = async (req: Request, res: Response) => {
        const user = new User({
            name: req.body.name,
            passWord: req.body.passWord,
            email: req.body.email,
            fullName: req.body.fullName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            cartId: req.body.cartId,
            slug: req.body.slug,
        })

        try {
            const mewUser = await user.save()
            res.status(201).json(mewUser)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { _id } = req.params
            const currentUser: any = await User.findOne({ _id })
            const fieldsUpdate: any = {}

            for (const [key, value] of Object.entries(req.body)) {
                if (currentUser[key] !== value) {
                    fieldsUpdate[key] = value
                }
            }
            if (Object.keys(fieldsUpdate).length === 0) {
                return res.status(200).json(currentUser)
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id },
                fieldsUpdate,
                { new: true })
            res.status(201).json(updatedUser)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            await User.delete({ _id: req.params._id })
            res.status(201).json({ message: 'Deleted' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default new UserController()