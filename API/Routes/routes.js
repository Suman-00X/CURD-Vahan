import express from 'express'
import {
    addPerson,
    getOnePerson,
    getAllPerson,
    updatePerson,
    deletePerson
} from '../Controller/controller.js'

const router = express.Router();

router.get('/', getAllPerson);
router.post('/add', addPerson);
router.get('/get-one/:id', getOnePerson);
router.put('/update/:id', updatePerson);
router.delete('/delete/:id', deletePerson);


export default router;