import mongoose, { Schema, Document } from "mongoose";

export interface IGrocery extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
}

const GrocerySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IGrocery>("groceries", GrocerySchema);