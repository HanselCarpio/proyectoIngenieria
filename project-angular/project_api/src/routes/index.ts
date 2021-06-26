import {Router} from 'express'

import auth from './auth'
import user from './user'
import consult from './consult'

const routes = Router();

routes.use('/auth',  auth);
routes.use('/users',  user);
routes.use('/consults',  consult);

export default routes;