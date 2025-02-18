import express from "express";
import { verifyToken } from "../middlewares/auth";
import { listAvailableItems, placeOrder } from "../controllers/userController";

const router = express.Router();

router.get('/grocery',verifyToken, listAvailableItems);
router.post('/order', verifyToken, placeOrder);

export default router;
