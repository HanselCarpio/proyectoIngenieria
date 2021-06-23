import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { validate } from 'class-validator';



export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(Users);
    let users;

    try {
      users = await userRepository.find({ 
        select: ['idUser', 'name', 'lastname', 'role', 'gender', 'cedula', 'birthday', 'idDepto', 'correo', 'cel', 'password'] 
      });
    } catch (e) {
      res.status(404).json({ message: 'Algo salio mal!' });
    }

    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).json({ message: 'sin resultados' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const userRepository = getRepository(Users);
    try {
      const user = await userRepository.findOneOrFail(idUser);
      res.send(user);
    } catch (e) {
      res.status(404).json({ message: 'Sin resultado' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { name, lastname, role, gender, cedula, birthday, idDepto, correo, cel, password} = req.body;
    const user = new Users;

    user.name = name;
    user.lastname = lastname;
    user.role = role;
    user.gender = gender;
    user.cedula = cedula;
    user.birthday = birthday;
    user.idDepto = idDepto;
    user.correo = correo;
    user.cel = cel;
    user.password = password;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const userRepository = getRepository(Users);
    try {
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'Correo existente' });
    }
    // All ok
    res.send('Usuario creado');
  };

  static edit = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { name, lastname, role, gender, cedula, birthday, idDepto, correo, cel } = req.body;

    const userRepository = getRepository(Users);
    // Try get user
    try {
      user = await userRepository.findOneOrFail(id);
      user.name = name;
      user.lastname = lastname;
      user.role = role;
      user.gender = gender;
      user.cedula = cedula;
      user.birthday = birthday;
      user.idDepto = idDepto;
      user.correo = correo;
      user.cel = cel;
    } catch (e) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'Correo actualmente en uso' });
    }

    res.status(201).json({ message: 'Usuario actualizado' });
  };

  static delete = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(idUser);
    } catch (e) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Remove user
    userRepository.delete(idUser);
    res.status(201).json({ message: 'Usuario eliminado' });
  };
}

export default UserController;
