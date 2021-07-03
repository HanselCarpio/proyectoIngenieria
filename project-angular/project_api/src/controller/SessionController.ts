import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Session } from '../entity/Session';
import { validate } from 'class-validator';



export class SessionController {
  static getAllSession = async (req: Request, res: Response) => {
    const sessionRepository = getRepository(Session);
    let session;

    try {
      session = await sessionRepository.find({ 
        select: ['idSession', 'ipCompu', 'correoUser', 'fechaHoraConex'] 
      });
    } catch (e) {
      res.status(404).json({ message: 'Algo salio mal!' });
    }

    if (session.length > 0) {
      res.send(session);
    } else {
      res.status(404).json({ message: 'sin resultados' });
    }
  };
  

  static newSession = async (req: Request, res: Response) => {
    const { idSession, ipCompu, correoUser, fechaHoraConex} = req.body;
    const session = new Session;

    session.idSession = idSession;
    session.ipCompu = ipCompu;
    session.correoUser = correoUser;
    session.fechaHoraConex = fechaHoraConex;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(session, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const sessionRepository = getRepository(Session);
    try {
    //   session.hashPassword();
      await sessionRepository.save(session);
    } catch (e) {
      return res.status(409).json({ message: 'algo salio mal' });
    }
    // All ok
    res.send('session init');
  };
}

export default SessionController;
