import { Router } from "express";
import { SendMailController } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const surveyUsersController = new SendMailController();

router.post("/users", userController.create);

router.post("/survey", surveyController.create);
router.get("/survey", surveyController.show);

router.post("/sendMail", surveyUsersController.execute);

export { router };