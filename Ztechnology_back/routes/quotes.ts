import { Router } from "express";
import { consultQuotes, updateQuote, saveQuotes, deleteQuote } from "../controllers/quotes";

const router = Router()

router.get('/consultQuotes', consultQuotes)
router.post('/saveQuotes', saveQuotes)
router.put('/updateQuotes', updateQuote)
router.delete('/deleteQuote/:id', deleteQuote)

export default router