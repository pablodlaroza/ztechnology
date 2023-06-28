import { Router } from "express";
import { consultClients , saveClients, updateClient, deleteClient} from "../controllers/clients";

const router = Router()

router.get('/consultClients', consultClients)
router.post('/saveClients', saveClients)
router.put('/updateClient', updateClient)
router.delete('/deleteClient/:id', deleteClient)

export default router