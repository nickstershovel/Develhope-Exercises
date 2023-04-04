"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const client_mock_1 = require("../lib/client.mock");
const app_1 = __importDefault(require("../app"));
const request = (0, supertest_1.default)(app_1.default);
describe("GET /planets", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
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
        ];
        // @ts-ignore
        client_mock_1.prismaMock.planet.findMany.mockResolvedValue(planets);
        const response = yield request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        expect(response.body).toEqual(planets);
    }));
});
describe("POST /planets", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            "id": 5,
            "name": "Venus",
            "description": null,
            "diameter": 21200,
            "createdAt": "2023-03-24T14:16:12.298Z",
            "updatedAt": "2023-03-24T14:16:12.298Z"
        };
        // @ts-ignore
        client_mock_1.prismaMock.planet.create.mockResolvedValue(planet);
        const response = yield request
            .post("/planets")
            .send({
            "name": "Venus",
            "diameter": 21200,
        })
            .expect(201)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        expect(response.body).toEqual(planet);
    }));
    test("Invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            "diameter": 21200,
        };
        const response = yield request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", "application/json; charset=utf-8");
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    }));
});
describe("GET /planet/:id", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            "id": 4,
            "name": "Venus",
            "description": null,
            "diameter": 21200,
            "createdAt": "2023-03-23T20:42:22.178Z",
            "updatedAt": "2023-03-23T20:41:39.398Z"
        };
        // @ts-ignore
        client_mock_1.prismaMock.planet.findUnique.mockResolvedValue(planet);
        const response = yield request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        expect(response.body).toEqual(planet);
    }));
    test("Planet does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        client_mock_1.prismaMock.planet.findUnique.mockResolvedValue(null);
        const response = yield request
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Cannot GET /planets/23");
    }));
    test("Invalid planet ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/planets/asdf")
            .expect(404)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Cannot GET /planets/asdf");
    }));
});
describe("PUT /planets/:id", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            "id": 5,
            "name": "Venus",
            "description": "Lovely planet!",
            "diameter": 21200,
            "createdAt": "2023-03-24T14:16:12.298Z",
            "updatedAt": "2023-03-24T14:16:12.298Z"
        };
        // @ts-ignore
        client_mock_1.prismaMock.planet.update.mockResolvedValue(planet);
        const response = yield request
            .put("/planets/3")
            .send({
            "name": "Venus",
            "description": "Lovely planet!",
            "diameter": 21200,
        })
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        expect(response.body).toEqual(planet);
    }));
    test("Invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            "diameter": 21200,
        };
        const response = yield request
            .put("/planets/23")
            .send(planet)
            .expect(422)
            .expect("Content-Type", "application/json; charset=utf-8");
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    }));
    test("Planet does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        client_mock_1.prismaMock.planet.update.mockRejectedValue(new Error("Error"));
        const response = yield request
            .put("/planets/23")
            .send({
            "name": "Venus",
            "description": "Lovely planet!",
            "diameter": 21200,
        })
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Cannot PUT /planets/23");
    }));
    test("Invalid planet ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .put("/planets/asdf")
            .send({
            "name": "Venus",
            "description": "Lovely planet!",
            "diameter": 21200,
        })
            .expect(404)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Cannot PUT /planets/asdf");
    }));
});
describe("DELETE /planet/:id", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/planets/1")
            .expect(204)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        expect(response.text).toEqual("");
    }));
    test("Planet does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        client_mock_1.prismaMock.planet.delete.mockRejectedValue(new Error("Error"));
        const response = yield request
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Cannot DELETE /planets/23");
    }));
    test("Invalid planet ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/planets/asdf")
            .expect(404)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Cannot DELETE /planets/asdf");
    }));
});
/*
* These tests depend on:  src/lib/middleware/multer.mock.ts
* It uses multer.memoryStorage so no files are written to disk.
*/
describe("POST /planets/:id/photos", () => {
    test("Valid request with PNG file upload", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/file.png")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    }));
    test("Valid request with JPG file upload", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/file.jpg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    }));
    test("Invalid request with text file upload", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/file.txt")
            .expect(500)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Error: The uploaded file must be a JPG or PNG image.");
    }));
    test("Planet does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        client_mock_1.prismaMock.planet.update.mockRejectedValue(new Error("Error"));
        const response = yield request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/file.png")
            .expect(404)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Cannot POST /planets/23/photo");
    }));
    test("invalid planet ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/planets/asdf/photo")
            .expect(404)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("Cannot POST /planets/asdf/photo");
    }));
    test("invalid request with no file upload", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/planets/23/photo")
            .expect(400)
            .expect("Content-Type", "text/html; charset=utf-8");
        expect(response.text).toContain("No photo file uploaded!");
    }));
});
