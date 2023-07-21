import { Router } from "express";
import { consultQuotes,consultQuoteById, updateQuote, saveQuotes, deleteQuote } from "../controllers/quotes";
import { sendEmail } from "../controllers/mailer";
const router = Router()

router.get('/consultQuotes', consultQuotes)
router.get('/consultQuote/:id', consultQuoteById)
router.post('/saveQuotes', saveQuotes)

// router.post('/saveQuotesProducts', quoteProduct)
// router.post('/send-email', sendEmail(to, subject, body))

router.put('/updateQuotes', updateQuote)
router.delete('/deleteQuote/:id', deleteQuote)

export default router