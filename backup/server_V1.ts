import 'reflect-metadata';
import express, { request, response } from 'express';
import "./database"
const app = express();
/**
 * GET => Buscar
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração especifica
*/ 

/** 
 * 1 param => Rota(Recurso API)
 * 2 param => request, response
 */

app.get("/", (request, response) => {
    // return response.send("Hello World - NLW04");
    return response.json( 
        { 
            message: "Hello World - NLW04"
        } 
    );
});

app.post("/post", (request, response) => {
    // recebeu os daos
    return response.json(
        {
            message: "Os dados foram salvos com sucesso"
        }

    );
});

app.listen(3333, () => console.log("Server is running!"));