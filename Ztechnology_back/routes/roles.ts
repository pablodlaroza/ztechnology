import { Router } from "express";
import { consultRoles, saveRoles,updateRole, deleteRole } from "../controllers/roles"; 

const router = Router()

router.get('/consultRoles', consultRoles)
router.post('/saveRole', saveRoles)
router.put('/updateRole', updateRole)
router.delete('/deleteRole/:id', deleteRole)

export default router