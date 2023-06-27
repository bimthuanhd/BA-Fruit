import express, { Request, Response } from "express"
import Order from "../models/Order"

class OrderController {
    getOrders_neqDelete = async (req: Request, res: Response) => {
        try {
            const orders = await Order.find({})
            res.json(orders)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getOrder = async (req: Request, res: Response) => {
        try {
            const order = await Order.findOne({
                _id: req.params._id
            })
            res.json(order)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    createOrder = async (req: Request, res: Response) => {
        const order = new Order({
            userId: req.body.userId,
            orderDate: req.body.orderDate,
            orderDetailIds: req.body.orderDetailIds,
            totalAmount: req.body.totalAmount,
            slug: req.body.slug,
        })

        try {
            const mewOrder = await order.save()
            res.status(201).json(mewOrder)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    updateOrder = async (req: Request, res: Response) => {
        try {
            const { _id } = req.params
            const currentOrder: any = await Order.findOne({ _id })
            const fieldsUpdate: any = {}

            for (const [key, value] of Object.entries(req.body)) {
                if (currentOrder[key] !== value) {
                    fieldsUpdate[key] = value
                }
            }
            if (Object.keys(fieldsUpdate).length === 0) {
                return res.status(200).json(currentOrder)
            }

            const updatedOrder = await Order.findOneAndUpdate(
                { _id },
                fieldsUpdate,
                { new: true })
            res.status(201).json(updatedOrder)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    deleteOrder = async (req: Request, res: Response) => {
        try {
            await Order.delete({ _id: req.params._id })
            res.status(201).json({ message: 'Deleted' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default new OrderController()