import { getConnection, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';
import { Consults } from '../entity/Consults';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { correo } = req.body;
    const { password } = req.body;

    if (!(correo && password)) {
      return res.status(400).json({ message: ' Correo & contraaseña son requeridos!' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { correo }});
      //user = await userRepository.findOneOrFail({ where: { password } });
    } catch (e) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos, Error!' });
    }
    // Check password
    if (!user.checkPassword(password)) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos!' });
    }

    const token = jwt.sign({ 
      userId: user.idUser, name: user.name, lastname: user.lastname,
      cedula: user.cedula, correo: user.correo
    }, config.jwtSecret, { expiresIn: '1h' });


    res.json({ message: 'OK', token, name: user.name, lastname: user.lastname, role: user.role, correo: user.correo });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res.status(400).json({ message: 'Contraseña antigua & contraseña nueva requeridas' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      res.status(400).json({ message: 'Oopps!, Algo salio mal!' });
    }

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'revisa tu contraseña vieja' });
    }

    user.password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Hash password
    user.hashPassword();
    userRepository.save(user);

    res.json({ message: 'Contraseña cambiada!' });
  };

  static getAnualResume= async (req: Request, res: Response) => {
      const consultRepository = getRepository(Consults);
      let consults;
  
      try {
        consults = await consultRepository.query('exec sp_anualResume');
      } catch (e) {
        res.status(404).json({ message: 'Algo salio mal!' });
      }  
      if (consults.length > 0) {
        res.send(consults);
      } else {
        res.status(404).json({ message: 'sin resultados' });
      }
  };


  static getTotalConsultas= async (req: Request, res: Response) => {
    const consultRepository = getRepository(Consults);
    let consults;

    try {
      consults = await consultRepository.query('exec sp_totalConsultas');
    } catch (e) {
      res.status(404).json({ message: 'Algo salio mal!' });
    }  
    if (consults.length > 0) {
      res.send(consults);
    } else {
      res.status(404).json({ message: 'sin resultados' });
    }
};

static getResumenConsultas= async (req: Request, res: Response) => {
  const consultRepository = getRepository(Consults);
  let consults;

  try {
    consults = await consultRepository.query('exec sp_resumenConsultas');
  } catch (e) {
    res.status(404).json({ message: 'Algo salio mal!' });
  }  
  if (consults.length > 0) {
    res.send(consults);
  } else {
    res.status(404).json({ message: 'sin resultados' });
  }
};

static getResumenContratos = async (req: Request, res: Response) => {
  const consultRepository = getRepository(Consults);
  let consults;

  try {
    consults = await consultRepository.query('exec sp_resumenContratos');
  } catch (e) {
    res.status(404).json({ message: 'Algo salio mal!' });
  }  
  if (consults.length > 0) {
    res.send(consults);
  } else {
    res.status(404).json({ message: 'sin resultados' });
  }
};


}
export default AuthController;
