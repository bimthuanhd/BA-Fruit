import mongoose, { Model, model } from "mongoose"
import shortid from "shortid"
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

interface OrderDocument extends MongooseDelete.SoftDeleteDocument {
  userId: string
  orderDate: Date
  orderDetailIds: string[]
  totalAmount: number
  slug: string
}

const OrderSchema = new Schema<OrderDocument>({
  userId: { type: String, require: true },
  orderDate: { type: Date, require: true },
  orderDetailIds: { type: [{ type: String }], require: true },
  totalAmount: { type: Number, require: true },
  slug: { type: String, slug: 'userId' },
},
  {
    timestamps: true,
    // versionKey: false,
  }
)

OrderSchema.plugin(MongooseDelete, {
  overrideMethods: ['find', 'findOne', 'countDocuments',],
  deletedAt: true,
  deletedBy: true,
})

const Order = mongoose.model<
  OrderDocument,
  MongooseDelete.SoftDeleteModel<OrderDocument>
>('Order', OrderSchema)

export default Order