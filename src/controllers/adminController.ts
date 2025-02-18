import mongoose from "mongoose";
import { Request, Response } from "express";
import Grocery, { IGrocery } from "../models/Grocery";

export const addItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, stock, category } = req.body;

    if (!name || !price || !stock || !category) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existingItem = await Grocery.findOne({ name });
    if (existingItem) {
      res.status(400).json({ error: "Item already exists" });
      return;
    }

    const input = req.body as IGrocery;
    const grocery = await Grocery.create(input);
    res
      .status(201)
      .json({ message: "Grocery item added successfully", grocery });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existingItem = await Grocery.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (!existingItem) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    const updatedItem = await Grocery.findByIdAndUpdate(
      existingItem?._id,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.params.id) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const existingItem = await Grocery.findById(
    new mongoose.Types.ObjectId(req.params.id)
  );
  if (!existingItem) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  await Grocery.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
  res.status(200).json({ message: "Item deleted successfully" });
};

export const listItems = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const items = await Grocery.find();
  res.status(200).json(items);
};
