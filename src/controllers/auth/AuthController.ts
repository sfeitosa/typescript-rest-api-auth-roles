import { Request, Response } from "express";
import { userRepository } from "../../repositories/auth/authRepository";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

export class AuthController {
  async login(req: Request, res: Response) {
    let { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send();
      return;
    }

    let user;

    try {
      user = await userRepository.findOneOrFail({
        where: { username },
      });
    } catch (error) {
      res.status(401).json({ message: "User or password invalid." });
      return;
    }

    if (!user.checkPassword(password)) {
      res.status(401).json({ message: "User of password invalid." });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.TOKEN_SECRET ?? "",
      { expiresIn: "1h" }
    );

    // const { password: _, ...userLogin } = user;

    res.status(200).json({ token: token });
  }

  async changePassword(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res.status(400).send();
      return;
    }

    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(401).json({ message: "User or password invalid." });
      return;
    }

    if (!user.checkPassword(oldPassword)) {
      res.status(401).json({ message: "User or password invalid." });
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();
    userRepository.save(user);

    res.status(204).send(user);
  }
}
