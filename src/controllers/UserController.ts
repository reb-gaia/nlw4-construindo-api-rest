import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepository";

class UserController {
    async create(request: Request, response: Response) {
        /* const body = request.body;
        console.log(body);

        return response.send(body); */
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UserRepository);
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            return response.status(201).json({
                error: "User already exists!"
            });
        }

        const user = usersRepository.create({
            name, 
            email,
        });

        await usersRepository.save(user);

        return response.json(user);
    }
}

export { UserController };
