import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { resolve } from 'path';
import { UserRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';


class SendMailController {
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UserRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExist = await usersRepository.findOne({email});

        if(!userAlreadyExist){
            return response.status(400).json({
                error: "Users does not exists",
            });
        }

        const survey = await surveysRepository.findOne({id: survey_id});

        if(!survey){
            return response.status(400).json({
                error: "Survey does not exists",
            });
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const variables = {
            name: userAlreadyExist.name,
            title: survey.title,
            description: survey.description,
            user_id: userAlreadyExist.id,
            link: process.env.URL_MAIL
        }

        const surveyUserAlreadyExist = await surveysUsersRepository.findOne({
            where: [{user_id: userAlreadyExist.id},{value: null}],
            relations: ["user", "survey"]
        });

        if(surveyUserAlreadyExist) {
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExist); 
        }
        
        // Salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExist.id,
            survey_id
        });

        await surveysUsersRepository.save(surveyUser);      

        // Enviar email para o usuário
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController };