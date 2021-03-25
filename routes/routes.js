import { Router } from 'express';
import { async_handler } from './middleware.js';
import { es_handler, mongo_handler } from './route-handlers.js';

const router = Router();

router.get('/with-mongo/:page', async_handler(mongo_handler));
router.get('/with-es/:page', async_handler(es_handler));

export default router;