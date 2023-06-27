import mongoose, { Model, model } from "mongoose"
import shortid from "shortid"
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

interface CartDocument extends MongooseDelete.SoftDeleteDocument {
  userId: string
  orderDetailIds: string[]
  slug: string
}

const CartSchema = new Schema<CartDocument>({
  userId: { type: String, require: true },
  orderDetailIds: { type: [{ type: String }], require: true },
  slug: { type: String, slug: 'userId' },
},
  {
    timestamps: true,
    // versionKey: false,
  }
)

CartSchema.plugin(MongooseDelete, {
  overrideMethods: ['find', 'findOne', 'countDocuments',],
  deletedAt: true,
  deletedBy: true,
})

const Cart = mongoose.model<
  CartDocument,
  MongooseDelete.SoftDeleteModel<CartDocument>
>('Cart', CartSchema)

export default Cart