import { Router } from 'express';
import bookRouter from './book';
const route = Router();

route.use('/books', bookRouter);

export default route;
