import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Clasificator } from '../entity/Clasificator';



export class ClasificatorController {
  static getAllClasi = async (req: Request, res: Response) => {
    const clasiRepository = getRepository(Clasificator);
    let clasificator;

    try {
      clasificator = await clasiRepository.find({ 
        select: ['idClasificator', 'descripcion'] 
      });
    } catch (e) {
      res.status(404).json({ message: 'Algo salio mal!' });
    }

    if (clasificator.length > 0) {
      res.send(clasificator);
    } else {
      res.status(404).json({ message: 'sin resultados' });
    }
  };
  

  static newClasi = async (req: Request, res: Response) => {
    const { descripcion} = req.body;
    const clasificator = new Clasificator;

    clasificator.descripcion = descripcion;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(clasificator, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const clasificatorRepository = getRepository(Clasificator);
    try {
    //   session.hashPassword();
      await clasificatorRepository.save(clasificator);
    } catch (e) {
      return res.status(409).json({ message: 'algo salio mal' });
    }
    // All ok
    res.send('session init');
  };
}

export default ClasificatorController;
