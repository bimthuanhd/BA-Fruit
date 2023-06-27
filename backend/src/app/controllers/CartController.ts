import express, { Request, Response } from "express"
import Cart from "../models/Cart"

class CartController {
    getCarts_neqDelete = async (req: Request, res: Response) => {
        try {
            const carts = await Cart.find({})
            res.json(carts)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getCart = async (req: Request, res: Response) => {
        try {
            const cart = await Cart.findOne({
                _id: req.params._id
            })
            res.json(cart)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    createCart = async (req: Request, res: Response) => {
        const cart = new Cart({
            userId: req.body.userId,
            orderDetailIds: req.body.orderDetailIds,
            slug: req.body.slug,
        })

        try {
            const mewCart = await cart.save()
            res.status(201).json(mewCart)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    updateCart = async (req: Request, res: Response) => {
        try {
            const { _id } = req.params
            const currentCart: any = await Cart.findOne({ _id })
            const fieldsUpdate: any = {}

            for (const [key, value] of Object.entries(req.body)) {
                if (currentCart[key] !== value) {
                    fieldsUpdate[key] = value
                }
            }
            if (Object.keys(fieldsUpdate).length === 0) {
                return res.status(200).json(currentCart)
            }

            const updatedCart = await Cart.findOneAndUpdate(
                { _id },
                fieldsUpdate,
                { new: true })
            res.status(201).json(updatedCart)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    deleteCart = async (req: Request, res: Response) => {
        try {
            await Cart.delete({ _id: req.params._id })
            res.status(201).json({ message: 'Deleted' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default new CartController()