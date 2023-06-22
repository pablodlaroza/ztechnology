import { Router } from "express";
import { consultUsers, saveUsers } from "../controllers/users";

const router = Router()


router.get('/consultUsers', consultUsers)
router.post('/saveUser', saveUsers)

export default router;

