import mongoose, { Model, model } from "mongoose"
import shortid from "shortid"
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

interface UserDocument extends MongooseDelete.SoftDeleteDocument {
  userName: string
  passWord: string
  email: string
  fullName: string
  address: string
  phoneNumber: number
  cartId: number
  slug: string
}

const UserSchema = new Schema<UserDocument>({
  userName: { type: String, require: true },
  passWord: { type: String, require: true },
  email: { type: String, require: true },
  fullName: { type: String, require: true },
  address: { type: String, require: true },
  phoneNumber: { type: Number, require: true },
  cartId: { type: Number, require: true },
  slug: { type: String, slug: 'userName' },
},
  {
    timestamps: true,
    // versionKey: false,
  }
)

UserSchema.plugin(MongooseDelete, {
  overrideMethods: ['find', 'findOne', 'countDocuments',],
  deletedAt: true,
  deletedBy: true,
})

const User = mongoose.model<
  UserDocument,
  MongooseDelete.SoftDeleteModel<UserDocument>
>('User', UserSchema)

export default User