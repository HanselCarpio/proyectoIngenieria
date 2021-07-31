import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Department } from '../entity/Department';



export class DepartmentController {
  static getAllDepart = async (req: Request, res: Response) => {
    const departRepository = getRepository(Department);
    let depart;

    try {
      depart = await departRepository.find({ 
        select: ['idDepartment', 'descripcion'] 
      });
    } catch (e) {
      res.status(404).json({ message: 'Algo salio mal!' });
    }

    if (depart.length > 0) {
      res.send(depart);
    } else {
      res.status(404).json({ message: 'sin resultados' });
    }
  };
  

  static newDepart = async (req: Request, res: Response) => {
    const { descripcion } = req.body;
    const depart = new Department;

    depart.descripcion = descripcion;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(depart, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const departRepository = getRepository(Department);
    try {
    //   session.hashPassword();
      await departRepository.save(depart);
    } catch (e) {
      return res.status(409).json({ message: 'algo salio mal' });
    }
    // All ok
    res.send('session init');
  };
}

export default DepartmentController;
