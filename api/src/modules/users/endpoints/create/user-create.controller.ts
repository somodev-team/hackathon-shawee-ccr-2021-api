import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { UserLoginService } from '../login/user-login.service';
import { UserCreateService } from './user-create.service';

export class UserCreateController {
  constructor(
    private userCreateService: UserCreateService,
    private userLoginService: UserLoginService
  ) {}

  async handle(req: Request, res: Response, next: any): Promise<Response> {
    const { type, email, password } = req.body;
    try {
      await this.userCreateService.execute({
        type,
        email,
        password,
      });
    } catch (error) {
      return next(createHttpError(400, error));
    }

    const token = await this.userLoginService.execute({
      email,
      password,
    });
    return res.json({ token });

    // return res.status(201).send();
  }
}
