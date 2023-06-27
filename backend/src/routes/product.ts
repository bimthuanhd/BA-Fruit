import ProductController from '../app/controllers/ProductController'
import express, { Router } from 'express'

const router: Router = express.Router();

router.get('/list', ProductController.getProducts_neqDelete);
router.get('/get/:_id', ProductController.getProduct);
router.patch('/update/:_id', ProductController.updateProduct);
router.post('/create', ProductController.createProduct);
router.delete('/delete/:_id', ProductController.deleteProduct);

export default router