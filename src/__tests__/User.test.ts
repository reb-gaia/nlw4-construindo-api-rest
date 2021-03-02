import createConnection from '../database';
import request from 'supertest';
import { app } from '../app';

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user"), async () => {
        const response = await request(app).post("/users").send({
            email: "rebeca@example.com",
            name: "example"
        });
        expect(response.status).toBe(201);
    }

    it("Should be able toya create a new user"), async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "example"
        });
        expect(response.status).toBe(201);
    }
})

