import { Router } from "express";
import { consultUsers, saveUsers, updateUser , deleteUser, consultUserById} from "../controllers/users"
import validateJWT from "../helpers/validateJWT";

const router = Router()


router.get('/consultUsers', consultUsers)
router.get('/consultUsers/:id', consultUserById)
router.post('/saveUser', saveUsers)
router.put('/updateUsers', updateUser )
router.delete('/deleteUser/:id', deleteUser)

export default router;

