import mongoose, { Model, model } from "mongoose"
import shortid from "shortid"
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

interface OrderDetailDocument extends MongooseDelete.SoftDeleteDocument {
  orderId: string
  productId: string
  quantity: number
  totaPrice: number
  slug: string
}

const OrderDetailSchema = new Schema<OrderDetailDocument>({
  orderId: { type: String, require: true },
  productId: { type: String, require: true },
  quantity: { type: Number, require: true },
  totaPrice: { type: Number, require: true },
  slug: { type: String, slug: 'orderId' },
},
  {
    timestamps: true,
    // versionKey: false,
  }
)

OrderDetailSchema.plugin(MongooseDelete, {
  overrideMethods: ['find', 'findOne', 'countDocuments',],
  deletedAt: true,
  deletedBy: true,
})

const OrderDetail = mongoose.model<
  OrderDetailDocument,
  MongooseDelete.SoftDeleteModel<OrderDetailDocument>
>('OrderDetail', OrderDetailSchema)

export default OrderDetail