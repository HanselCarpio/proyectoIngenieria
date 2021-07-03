import {Router} from 'express'

import auth from './auth'
import user from './user'
import consult from './consult'
import session from './session'
import details from './details'
import legalAnswer from './legalAnswer'

const routes = Router();

routes.use('/auth',  auth);
routes.use('/users',  user);
routes.use('/consults',  consult);
routes.use('/session',  session);
routes.use('/details',  details);
routes.use('/answer',  legalAnswer);

export default routes;