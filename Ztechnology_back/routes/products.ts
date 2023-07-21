import { Router } from "express";
import { consultProducts,consultProductById, saveProducts,updateProduct,deleteProduct } from "../controllers/products";

const router = Router()

router.get('/consultProducts', consultProducts)
router.get('/consultProduct/:id', consultProductById)
router.post('/saveProducts', saveProducts)
router.put('/updateProduct', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)

export default router