import * as supertest from "supertest";
import { prismaMock } from "./lib/prisma/client.mock";
import app from "./app";

const request = supertest(app)

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                "id": 4,
                "name": "Venus",
                "description": null,
                "diameter": 21200,
                "createdAt": "2023-03-23T20:42:22.178Z",
                "updatedAt": "2023-03-23T20:41:39.398Z"
            },
            {
                "id": 1,
                "name": "Earth",
                "description": null,
                "diameter": 21300,
                "createdAt": "2023-03-23T12:23:26.308Z",
                "updatedAt": "2023-03-23T20:42:22.178Z"
            },
            {
                "id": 2,
                "name": "Mercury",
                "description": null,
                "diameter": 23344,
                "createdAt": "2023-03-23T12:23:47.640Z",
                "updatedAt": "2023-03-23T20:42:22.178Z"
            },
            {
                "id": 3,
                "name": "Saturn",
                "description": null,
                "diameter": 21122,
                "createdAt": "2023-03-23T12:23:49.080Z",
                "updatedAt": "2023-03-23T20:42:30.829Z"
            }
        ]
        // @ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);
        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planets)
    }
    )

});


describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            "id": 5,
            "name": "Venus",
            "description": null,
            "diameter": 21200,
            "createdAt": "2023-03-24T14:16:12.298Z",
            "updatedAt": "2023-03-24T14:16:12.298Z"
        }

        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const response = await request
            .post("/planets")
            .send({
                "name": "Venus",
                "diameter": 21200,
            })
            .expect(201)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet)
    });

    test("Invalid request", async () => {
        const planet = {
            "diameter": 21200,
        }


        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", "application/json; charset=utf-8");

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        })
    }
    )
})

describe("GET /planet/:id", () => {
    test("Valid request", async () => {
        const planet = 
            {
                "id": 4,
                "name": "Venus",
                "description": null,
                "diameter": 21200,
                "createdAt": "2023-03-23T20:42:22.178Z",
                "updatedAt": "2023-03-23T20:41:39.398Z"
            }


        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);
        const response = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet)
    }
    )
    test("Planet does not exist", async () => {
    
        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);
        const response = await request
        .get("/planets/23")
        .expect(404)
        .expect("Content-Type", "text/html; charset=utf-8")

        expect(response.text).toContain("Cannot GET /planets/23")
    })

    test("Invalid planet ID", async () => {

        const response = await request
        .get("/planets/asdf")
        .expect(404)
        .expect("Content-Type", "text/html; charset=utf-8")

        expect(response.text).toContain("Cannot GET /planets/asdf")
    })
});

describe("PUT /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
            "id": 5,
            "name": "Venus",
            "description": "Lovely planet!",
            "diameter": 21200,
            "createdAt": "2023-03-24T14:16:12.298Z",
            "updatedAt": "2023-03-24T14:16:12.298Z"
        }

        // @ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet);

        const response = await request
            .put("/planets/3")
            .send({
                "name": "Venus",
                "description": "Lovely planet!",
                "diameter": 21200,
            })
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet)
    });

    test("Invalid request", async () => {
        const planet = {
            "diameter": 21200,
        }


        const response = await request
            .put("/planets/23")
            .send(planet)
            .expect(422)
            .expect("Content-Type", "application/json; charset=utf-8");

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        })
    }
    )
    test("Planet does not exist", async () => {
    
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));
        const response = await request
        .put("/planets/23")
        .send({
            "name": "Venus",
            "description": "Lovely planet!",
            "diameter": 21200,
        })
        .expect("Content-Type", "text/html; charset=utf-8")

        expect(response.text).toContain("Cannot PUT /planets/23")
    })

    test("Invalid planet ID", async () => {

        const response = await request
        .put("/planets/asdf")
        .send({
            "name": "Venus",
            "description": "Lovely planet!",
            "diameter": 21200,
        })
        .expect(404)
        .expect("Content-Type", "text/html; charset=utf-8")

        expect(response.text).toContain("Cannot PUT /planets/asdf")
    })
})

describe("DELETE /planet/:id", () => {
    test("Valid request", async () => {
        const response = await request
            .delete("/planets/1")
            .expect(204)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.text).toEqual("")
    }
    )
    test("Planet does not exist", async () => {
    
        // @ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));
        const response = await request
        .delete("/planets/23")
        .expect(404)
        .expect("Content-Type", "text/html; charset=utf-8")

        expect(response.text).toContain("Cannot DELETE /planets/23")
    })

    test("Invalid planet ID", async () => {

        const response = await request
        .delete("/planets/asdf")
        .expect(404)
        .expect("Content-Type", "text/html; charset=utf-8")

        expect(response.text).toContain("Cannot DELETE /planets/asdf")
    })
});