import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';

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

  // static forgotPassword = async(req: Request, res:Response)=>{
  //   const {username}  = req.body;
  //   if(!(username)){
  //     return res.status(400).json({message: 'username in required!'});
  //   }
  //   const message = 'Check your email for a link to reset your password'
  //   let verificationLink;
  //   let emailStatus = 'Ok';

  //   const userRepository = getRepository(Users);
  //   let user: Users;
  //   try{
  //     user = await userRepository.findOneOrFail({ where: { username }});
  //     const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecretReset, {expiresIn: '10m'});
  //     verificationLink = `http://localhost:3000/new-password/${token}`;
  //     user.resetToken = token;
  //   }catch(error){
  //     return res.json({ message});
  //   }

    
  //   try{
  //     //toDo: send email
  //   }catch(error){
  //     emailStatus = error;
  //     return res.status(400).json({ message: 'something goes wrong'});
  //   }

  //   try{
  //     await userRepository.save(user);
  //   }catch(error){
  //     emailStatus = error;
  //     return res.status(400).json({ message: 'something goes wrong'});
  //   }

  //   res.json({ message, info: emailStatus, test: verificationLink})
  // }

  // static createNewPassword = async(req: Request, res: Response)=>{
  //   const {newPassword} = req.body;
  //   const resetToken = req.headers.reset as string;

  //   if(!(resetToken && newPassword)){
  //     res.status(400).json({ message: 'All the fields are required' });
  //   }
  //   const userRepository = getRepository(Users);
  //   let jwtPayload;
  //   let user: Users;

  //   try{
  //     jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
  //     user =  await userRepository.findOneOrFail({where: {resetToken}})
  //   }catch(error){
  //     return res.status(401).json({message : 'Something goes wrong'});
  //   }

  //   user.password = newPassword;
  //   const validationOps = {validationError: {target: false, value: false}};
  //   const errors = await validate(user, validationOps);
  //   if(errors.length >0){
  //     return res.status(400).json(errors);
  //   }

  //   try {
  //     user.hashPassword()
  //     await userRepository.save(user);
  //   } catch (error) {
  //     return res.status(401).json({message : 'Something goes wrong'});
  //   }

  //   res.json({message: 'Password changed'})
  // }
}
export default AuthController;
