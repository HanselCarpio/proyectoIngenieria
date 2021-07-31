import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Gender } from '../entity/Gender';



export class GenderController {
  static getAllGender = async (req: Request, res: Response) => {
    const genderRepository = getRepository(Gender);
    let gender;

    try {
      gender = await genderRepository.find({ 
        select: ['idGender', 'descripcion'] 
      });
    } catch (e) {
      res.status(404).json({ message: 'Algo salio mal!' });
    }

    if (gender.length > 0) {
      res.send(gender);
    } else {
      res.status(404).json({ message: 'sin resultados' });
    }
  };
  

  static newGender = async (req: Request, res: Response) => {
    const { descripcion} = req.body;
    const gender = new Gender;

    gender.descripcion = descripcion;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(gender, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const genderRepository = getRepository(Gender);
    try {
    //   session.hashPassword();
      await genderRepository.save(gender);
    } catch (e) {
      return res.status(409).json({ message: 'algo salio mal' });
    }
    // All ok
    res.send('session init');
  };
}

export default GenderController;
