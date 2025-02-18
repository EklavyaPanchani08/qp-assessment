import express from "express";
import { verifyToken, adminAuth } from "../middlewares/auth";
import {
  addItem,
  updateItem,
  deleteItem,
  listItems,
} from "../controllers/adminController";

const router = express.Router();

router.post("/grocery", verifyToken, adminAuth, addItem);
router.put("/grocery/:id", verifyToken, adminAuth, updateItem);
router.delete("/grocery/:id", verifyToken, adminAuth, deleteItem);
router.get("/grocery", verifyToken, adminAuth, listItems);

export default router;
