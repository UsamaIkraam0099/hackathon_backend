import mongoose, { Schema } from "mongoose";

export enum OrderStatus {
  OCCUPIED = "occupied",
  AVAILABLE = "available",
  PURCHASED = "purchased",
}

const bookSchema = new Schema(
  {
    orderRefNo: {
      type: String,
      required: [true, "Order reference number is required"],
    },
    status: {
      type: String,
      default: OrderStatus.AVAILABLE,
      enum: Object.values(OrderStatus),
      required: [true, "Price is required"],
    },
    transactionType: {
      type: String,
      required: [true, "Transaction type is required"],
    },
    orderValue: {
      type: String,
      required: [true, "Order value is required"],
    },
    createdBy: {
      type: String,
      required: [true, "Created by is required"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", bookSchema);
export default Order;
