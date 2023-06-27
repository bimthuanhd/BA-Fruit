import mongoose, { Model, model } from "mongoose"
import shortid from "shortid"
import MongooseDelete from 'mongoose-delete'

const Schema = mongoose.Schema

interface UserDocument extends MongooseDelete.SoftDeleteDocument {
  username: string
  email: string
  password: string
  isAdmin: boolean
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, require: true, minlength: 6, maxlength: 20, unique: true },
  email: { type: String, require: true, minlength: 10, maxlength: 50, unique: true },
  password: { type: String, require: true, minlength: 6 },
  isAdmin: { type: Boolean, default: false }
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

UserSchema.statics.isUsernameTaken = async (username) => {
  const user = await User.findOne({ username })
  return !!user
}

UserSchema.statics.isEmailTaken = async (email) => {
  const user = await User.findOne({ email })
  return !!user
}

const User = mongoose.model<
  UserDocument,
  MongooseDelete.SoftDeleteModel<UserDocument>
>('User', UserSchema)

export default User