import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Consults } from '../entity/Consults';
import { validate } from 'class-validator';

export class ConsultController {
    static getAllConsults = async (req: Request, res: Response) => {
      const consultRepository = getRepository(Consults);
      let consults;
  
      try {
        consults = await consultRepository.find({ 
          select: ['idBoleta','fechaHora','idUser','palabraClaveConsulta1','palabraClaveConsulta2',
            'asuntoDetallado','ipCompu','cantidadCambios','idClasificador']
        });
      } catch (e) {
        res.status(404).json({ message: 'Algo salio mal!' });
      }
  
      if (consults.length > 0) {
        res.send(consults);
      } else {
        res.status(404).json({ message: 'sin resultados' });
      }
    };
    
  
    // static getUserById = async (req: Request, res: Response) => {
    //   const { idUser } = req.params;
    //   const userRepository = getRepository(Users);
    //   try {
    //     const user = await userRepository.findOneOrFail(idUser);
    //     res.send(user);
    //   } catch (e) {
    //     res.status(404).json({ message: 'Sin resultado' });
    //   }
    // };
  
    static newConsult = async (req: Request, res: Response) => {
      const { fechaHora, idUser, palabraClaveConsulta1, palabraClaveConsulta2,
        asuntoDetallado, ipCompu, cantidadCambios, idClasificador} = req.body;
      const consult = new Consults;
  
      consult.fechaHora = fechaHora;
      consult.idUser = idUser;
      consult.palabraClaveConsulta1 = palabraClaveConsulta1;
      consult.palabraClaveConsulta2 = palabraClaveConsulta2;
      consult.asuntoDetallado = asuntoDetallado;
      consult.ipCompu = ipCompu;
      consult.cantidadCambios = cantidadCambios;
      consult.idClasificador = idClasificador;
  
      // Validate
      const validationOpt = { validationError: { target: false, value: false } };
      const errors = await validate(consult, validationOpt);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
  
  
      const consultRepository = getRepository(Consults);
      try {
    //     user.hashPassword();
        await consultRepository.save(consult);
      } catch (e) {
        return res.status(409).json({ message: 'Error desconocido' });
      }
      // All ok
      res.send('Boleta creada');
    };
  
    // static editUser = async (req: Request, res: Response) => {
    //   let user;
    //   const { id } = req.params;
    //   const { name, lastname, role, gender, cedula, birthday, idDepto, correo, cel } = req.body;
  
    //   const userRepository = getRepository(Users);
    //   // Try get user
    //   try {
    //     user = await userRepository.findOneOrFail(id);
    //     user.name = name;
    //     user.lastname = lastname;
    //     user.role = role;
    //     user.gender = gender;
    //     user.cedula = cedula;
    //     user.birthday = birthday;
    //     user.idDepto = idDepto;
    //     user.correo = correo;
    //     user.cel = cel;
    //   } catch (e) {
    //     return res.status(404).json({ message: 'Usuario no encontrado' });
    //   }
    //   const validationOpt = { validationError: { target: false, value: false } };
    //   const errors = await validate(user, validationOpt);
  
    //   if (errors.length > 0) {
    //     return res.status(400).json(errors);
    //   }
  
    //   // Try to save user
    //   try {
    //     await userRepository.save(user);
    //   } catch (e) {
    //     return res.status(409).json({ message: 'Correo actualmente en uso' });
    //   }
  
    //   res.status(201).json({ message: 'Usuario actualizado' });
    // };
  
    // static deleteUser = async (req: Request, res: Response) => {
    //   const { idUser } = req.params;
    //   const userRepository = getRepository(Users);
    //   let user: Users;
  
    //   try {
    //     user = await userRepository.findOneOrFail(idUser);
    //   } catch (e) {
    //     return res.status(404).json({ message: 'Usuario no encontrado' });
    //   }
  
    //   // Remove user
    //   userRepository.delete(idUser);
    //   res.status(201).json({ message: 'Usuario eliminado' });
    // };
  }
  
  export default ConsultController;
  