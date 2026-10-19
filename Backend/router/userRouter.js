import express from 'express';
import { createUser, depart, getDepartments, getEmployee, getEmployees, setEmployee } from '../controller/userController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/dep', depart);
router.get('/dep', getDepartments);
router.post('/emp', setEmployee);
router.get('/emp', getEmployee);
router.get('/employees', getEmployees);

export default router;
