import dotenv from 'dotenv';
import App from "./app";
import AuthController from "./_controllers/AuthController";
import UserController from "./_controllers/UserController";
import PermissionController from "./_controllers/PermissionController";
import EventController from "./_controllers/EventController";
import TestController from "./_controllers/TestController";

dotenv.config();

const app = new App([
    AuthController,
    UserController,
    PermissionController,
    EventController,
    TestController
], parseInt(process.env.PORT, 10) || 81);

app.listen()
