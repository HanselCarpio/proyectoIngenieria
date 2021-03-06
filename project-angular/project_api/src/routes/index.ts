import {Router} from 'express'

import auth from './auth'
import user from './user'
import consult from './consult'
import session from './session'
import details from './details'
import legalAnswer from './legalAnswer'
import gender from './gender'
import department from './department'
import clasificator from './clasificator'

const routes = Router();

routes.use('/auth',  auth);
routes.use('/users',  user);
routes.use('/consults',  consult);
routes.use('/session',  session);
routes.use('/details',  details);
routes.use('/answer',  legalAnswer);
routes.use('/gender',  gender);
routes.use('/clasificator',  clasificator);
routes.use('/department',  department);

export default routes;