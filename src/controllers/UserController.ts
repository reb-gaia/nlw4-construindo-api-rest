import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
    async create(request: Request, response: Response) {
        /* const body = request.body;
        console.log(body);

        return response.send(body); */
        const { name, email } = request.body;

        const usersRepository = getRepository(User);

        const user = usersRepository.create({
            name, 
            email,
        });

        await usersRepository.save(user);

        return response.json(user);
    }
}

export { UserController } ;