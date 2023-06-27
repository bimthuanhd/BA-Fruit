import express, { Request, Response } from "express"
import CategoryProduct from "../models/CategoryProduct"

class CategoryProductController {
    getCategoryProducts_neqDelete = async (req: Request, res: Response) => {
        try {
            const categoryProducts = await CategoryProduct.find({})
            res.json(categoryProducts)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getCategoryProduct = async (req: Request, res: Response) => {
        try {
            const categoryProduct = await CategoryProduct.findOne({
                _id: req.params._id
            })
            res.json(categoryProduct)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    createCategoryProduct = async (req: Request, res: Response) => {
        const categoryProduct = new CategoryProduct({
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
        })

        try {
            const mewCategoryProduct = await categoryProduct.save()
            res.status(201).json(mewCategoryProduct)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    updateCategoryProduct = async (req: Request, res: Response) => {
        try {
            const { _id } = req.params
            const currentCategoryProduct: any = await CategoryProduct.findOne({ _id })
            const fieldsUpdate: any = {}

            for (const [key, value] of Object.entries(req.body)) {
                if (currentCategoryProduct[key] !== value) {
                    fieldsUpdate[key] = value
                }
            }
            if (Object.keys(fieldsUpdate).length === 0) {
                return res.status(200).json(currentCategoryProduct)
            }

            const updatedCategoryProduct = await CategoryProduct.findOneAndUpdate(
                { _id },
                fieldsUpdate,
                { new: true })
            res.status(201).json(updatedCategoryProduct)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    deleteCategoryProduct = async (req: Request, res: Response) => {
        try {
            await CategoryProduct.delete({ _id: req.params._id })
            res.status(201).json({ message: 'Deleted' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default new CategoryProductController()