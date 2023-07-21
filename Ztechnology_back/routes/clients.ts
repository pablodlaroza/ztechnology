import { Router } from "express";
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { consultClients , saveClients, updateClient, deleteClient, consultClientById} from "../controllers/clients";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      const randomName = uuidv4()
      cb(null, `${randomName}.${file.mimetype.split("/")[1]}`)
    }
  })
  
  const upload = multer({ storage: storage })

const router = Router()

router.get('/consultClients', consultClients)
router.get('/consultClients/:id', consultClientById)

router.post('/saveClients',upload.single('file'), saveClients)
router.put('/updateClient', updateClient)
router.delete('/deleteClient/:id', deleteClient)

export default router