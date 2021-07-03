import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { LegalAnswer } from '../entity/LegalAnswer';



export class LegalAnswerController {
  static getAllLegalAnswer = async (req: Request, res: Response) => {
    const legalAnswerRepository = getRepository(LegalAnswer);
    let legalAnswer;

    try {
      legalAnswer = await legalAnswerRepository.find({ 
        select: ['idRespuesta', 'descripcion', 'detalleRespuesta', 'fechaHoraRespuesta', 'idUserRespuesta', 'ipCompu', 'idBoleta'] 
      });
    } catch (e) {
      res.status(404).json({ message: 'Algo salio mal!' });
    }

    if (legalAnswer.length > 0) {
      res.send(legalAnswer);
    } else {
      res.status(404).json({ message: 'sin resultados' });
    }
  };
  
  static newLegalAnswer = async (req: Request, res: Response) => {
    const { idRespuesta, descripcion, detalleRespuesta, fechaHoraRespuesta, idUserRespuesta, ipCompu, idBoleta} = req.body;
    const legalAnswer = new LegalAnswer;

    legalAnswer.idRespuesta = idRespuesta;
    legalAnswer.descripcion = descripcion;
    legalAnswer.detalleRespuesta = detalleRespuesta;
    legalAnswer.fechaHoraRespuesta = fechaHoraRespuesta;
    legalAnswer.idUserRespuesta = idUserRespuesta;
    legalAnswer.ipCompu = ipCompu;
    legalAnswer.idBoleta = idBoleta;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(legalAnswer, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const legalAnswerRepository = getRepository(LegalAnswer);
    try {
    //   user.hashPassword();
      await legalAnswerRepository.save(legalAnswer);
    } catch (e) {
      return res.status(409).json({ message: 'Error existente' });
    }
    // All ok
    res.send('Respuesta creada');
  };

  static deleteRespuesta = async (req: Request, res: Response) => {
    const { idRespuesta } = req.params;
    const legalAnswerRepository = getRepository(LegalAnswer);
    let legalAnswer: LegalAnswer;

    try {
      legalAnswer = await legalAnswerRepository.findOneOrFail(idRespuesta);
    } catch (e) {
      return res.status(404).json({ message: 'Respuesta no encontrado' });
    }

    // Remove user
    legalAnswerRepository.delete(idRespuesta);
    res.status(201).json({ message: 'Respuesta eliminado' });
  };
}

export default LegalAnswerController;
