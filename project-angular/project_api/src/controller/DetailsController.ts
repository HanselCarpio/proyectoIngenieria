import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Details } from '../entity/Details';

export class ConsultController {
    static getAllDetails = async (req: Request, res: Response) => {
      const detailsRepository = getRepository(Details);
      let details;
  
      try {
        details = await detailsRepository.find({ 
          select: ['idBoleta','linea','evidenciaArchivo','detalle']
        });
      } catch (e) {
        res.status(404).json({ message: 'Algo salio mal!' });
      }
  
      if (details.length > 0) {
        res.send(details);
      } else {
        res.status(404).json({ message: 'sin resultados' });
      }
    };
    
  
    static newDetails = async (req: Request, res: Response) => {
      const { idBoleta,linea,evidenciaArchivo,detalle } = req.body;
      const details = new Details;
  
      details.idBoleta = idBoleta;
      details.linea = linea;
      details.evidenciaArchivo = evidenciaArchivo;
      details.detalle = detalle;
  
      // Validate
      const validationOpt = { validationError: { target: false, value: false } };
      const errors = await validate(details, validationOpt);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
  
  
      const detailsRepository = getRepository(Details);
      try {
    //     user.hashPassword();
        await detailsRepository.save(details);
      } catch (e) {
        return res.status(409).json({ message: 'Error desconocido' });
      }
      // All ok
      res.send('Detalle creado');
    };
  
  }
  
  export default ConsultController;
  