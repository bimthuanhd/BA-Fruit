
export const multipleMongooseToObject = (mongooses: any) => {
  return mongooses.map((mongoose: any) => mongoose.toObject());
}

export const mongooseToObject = (mongoose: any) => {
  return mongoose ? mongoose.toObject() : mongoose;
}