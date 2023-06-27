import express, { Request, Response } from "express"
import OrderDetail from "../models/OrderDetail"

class OrderDetailController {
    getOrderDetails_neqDelete = async (req: Request, res: Response) => {
        try {
            const orderDetails = await OrderDetail.find({})
            res.json(orderDetails)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getOrderDetail = async (req: Request, res: Response) => {
        try {
            const orderDetail = await OrderDetail.findOne({
                _id: req.params._id
            })
            res.json(orderDetail)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    createOrderDetail = async (req: Request, res: Response) => {
        const orderDetail = new OrderDetail({
            orderId: req.body.orderId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            totaPrice: req.body.totaPrice,
            slug: req.body.slug,
        })

        try {
            const mewOrderDetail = await orderDetail.save()
            res.status(201).json(mewOrderDetail)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    updateOrderDetail = async (req: Request, res: Response) => {
        try {
            const { _id } = req.params
            const currentOrderDetail: any = await OrderDetail.findOne({ _id })
            const fieldsUpdate: any = {}

            for (const [key, value] of Object.entries(req.body)) {
                if (currentOrderDetail[key] !== value) {
                    fieldsUpdate[key] = value
                }
            }
            if (Object.keys(fieldsUpdate).length === 0) {
                return res.status(200).json(currentOrderDetail)
            }

            const updatedOrderDetail = await OrderDetail.findOneAndUpdate(
                { _id },
                fieldsUpdate,
                { new: true })
            res.status(201).json(updatedOrderDetail)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    deleteOrderDetail = async (req: Request, res: Response) => {
        try {
            await OrderDetail.delete({ _id: req.params._id })
            res.status(201).json({ message: 'Deleted' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default new OrderDetailController()