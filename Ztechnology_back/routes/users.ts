import { Router } from "express";
import { consultUsers, saveUsers, updateUser , deleteUser} from "../controllers/users"

const router = Router()


router.get('/consultUsers', consultUsers)
router.post('/saveUser', saveUsers)
router.put('/updateUsers', updateUser )
router.delete('/deleteUser/:id', deleteUser)

export default router;

