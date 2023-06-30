import { Router } from "express";
import { consultProducts, saveProducts,updateProduct,deleteProduct } from "../controllers/products";

const router = Router()

router.get('/consultProducts', consultProducts)
router.post('/saveProducts', saveProducts)
router.put('/updateProduct', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)

export default router