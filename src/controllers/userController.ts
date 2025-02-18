import { Request, Response } from "express";
import Grocery from "../models/Grocery";
import Order from "../models/Order";

export const listAvailableItems = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await Grocery.find({ stock: { $gt: 0 } });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const placeOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { items, userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: "userId not provided" });
      return;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Invalid order items" });
      return;
    }

    let totalAmount = 0;
    const orderItems = [];

    for (let item of items) {
      if (!item._id || !item.quantity) {
        res.status(400).json({ message: "Invalid order item format" });
        return;
      }
      let grocery = await Grocery.findById(item._id);

      // Validate item
      if (!grocery) {
        res.status(404).json({ message: "Item not found" });
      }
      if (!grocery || grocery.stock < item.quantity) {
        res.status(400).json({
          message: `Insufficient stock for ${grocery?.name || "unknown item"}`,
        });
        return;
      }
      // Deduct stock
      grocery.stock -= item.quantity;
      await grocery.save();

      // Calculate total price and prepare order items
      const itemTotal = grocery.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        groceryId: grocery._id,
        quantity: item.quantity,
      });
    }

    // Create order entry
    await Order.create({
      userId: userId,
      items: orderItems,
      totalAmount: totalAmount,
    });

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
