import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  groceryId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  // status: "pending" | "completed" | "cancelled"; // FOR FUTURE USE
  createdAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    items: [
      {
        groceryId: { type: Schema.Types.ObjectId, ref: "groceries", required: true },
        quantity: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    // status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" } // FOR FUTURE USE
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("orders", OrderSchema);
