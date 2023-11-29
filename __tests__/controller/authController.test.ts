import request from "supertest";
import app from "../../src/app";
import UserModel from "../../src/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let server: any;

beforeAll(() => {
  server = app.listen();
});

afterAll((done) => {
  server.close(done);
});

jest.mock("../../src/models/userModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthController - conectarUsuario", () => {
  it("200 - User com credenciais corretas", async () => {
    // Mockando as respostas
    (UserModel.findOne as jest.Mock).mockResolvedValue({
      _id: "123",
      senha: "hash",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("fake_token");

    const response = await request(app)
      .post("/api/auth")
      .send({ email: "test@example.com", senha: "password" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("404 - User inexistente", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post("/api/auth")
      .send({ email: "test@gg.com", senha: "password" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  it("401 - Senha incorreta", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue({
      _id: "123",
      senha: "hash",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const response = await request(app).post("/api/auth").send({
      email: "",
      senha: "password",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("500 - Erro ao conectar o usuário", async () => {
    (UserModel.findOne as jest.Mock).mockRejectedValue(new Error());

    const response = await request(app)
      .post("/api/auth")
      .send({ 
        email: "",
        senha: "password" 
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});
