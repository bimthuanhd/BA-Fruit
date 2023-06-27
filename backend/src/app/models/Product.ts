import mongoose, { Model, model } from "mongoose"
import shortid from "shortid"
import MongooseDelete from 'mongoose-delete'
import { type } from "os"

const Schema = mongoose.Schema

interface ProductDocument extends MongooseDelete.SoftDeleteDocument {
  name: string
  description: string
  price: number
  image: string
  categoryIds: string[]
  slug: string
}

const ProductSchema = new Schema<ProductDocument>({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  categoryIds: { type: [{type: String}], require: true },
  slug: { type: String, slug: 'name' },
},
  {
    timestamps: true,
    // versionKey: false,
  }
)

ProductSchema.plugin(MongooseDelete, {
  overrideMethods: ['find', 'findOne', 'countDocuments',],
  deletedAt: true,
  deletedBy: true,
})

const Product = mongoose.model<
  ProductDocument,
  MongooseDelete.SoftDeleteModel<ProductDocument>
>('Product', ProductSchema)

export default Product