import mongoose, { Model, model } from "mongoose"
import shortid from "shortid"
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

interface CategoryProductDocument extends MongooseDelete.SoftDeleteDocument {
  name: string
  description: string
  slug: string
}

const CategoryProductSchema = new Schema<CategoryProductDocument>({
  name: { type: String, require: true },
  description: { type: String, require: true },
  slug: { type: String, slug: 'name' },
},
  {
    timestamps: true,
    // versionKey: false,
  }
)

CategoryProductSchema.plugin(MongooseDelete, {
  overrideMethods: ['find', 'findOne', 'countDocuments',],
  deletedAt: true,
  deletedBy: true,
})

const CategoryProduct = mongoose.model<
  CategoryProductDocument,
  MongooseDelete.SoftDeleteModel<CategoryProductDocument>
>('CategoryProduct', CategoryProductSchema)

export default CategoryProduct