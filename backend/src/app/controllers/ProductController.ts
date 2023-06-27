import express, { Request, Response } from "express"
import Product from "../../app/models/Product"

class ProductController {
    getProducts_neqDelete = async (req: Request, res: Response) => {
        try {
            const products = await Product.find({})
            res.json(products)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getProduct = async (req: Request, res: Response) => {
        try {
            const product = await Product.findOne({
                _id: req.params._id
            })
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    createProduct = async (req: Request, res: Response) => {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            categoryIds: req.body.categoryIds,
            slug: req.body.slug,
        })

        try {
            const mewProduct = await product.save()
            res.status(201).json(mewProduct)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            const { _id } = req.params
            const currentProduct: any = await Product.findOne({ _id })
            const fieldsUpdate: any = {}

            for (const [key, value] of Object.entries(req.body)) {
                if (currentProduct[key] !== value) {
                    fieldsUpdate[key] = value
                }
            }
            if (Object.keys(fieldsUpdate).length === 0) {
                return res.status(200).json(currentProduct)
            }

            const updatedProduct = await Product.findOneAndUpdate(
                { _id },
                fieldsUpdate,
                { new: true })
            res.status(201).json(updatedProduct)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            await Product.delete({ _id: req.params._id })
            res.status(201).json({ message: 'Deleted' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default new ProductController()