import createConnection from '../database';
import request from 'supertest';
import { app } from '../app';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user"), async () => {
        const response = await request(app).post("/survey").send({
            title: "test",
            description: "test test teste"
        });
        expect(response.status).toBe(201);
    }
})