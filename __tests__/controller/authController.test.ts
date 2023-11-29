import request from "supertest";
import app from "../../src/app";
import UserModel from "../../src/models/userModel";
import RecoverCodeModel from "../../src/models/recoverModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../src/email/config";

let server: any;

beforeAll(() => {
  server = app.listen();
});

afterAll((done) => {
  server.close(done);
});

jest.mock("../../src/models/userModel");
jest.mock("../../src/models/recoverModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../src/email/config", () => ({
  sendEmail: jest.fn(),
}));

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
      email: "test@gg.com",
      senha: "password",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("500 - Erro ao conectar o usuário", async () => {
    (UserModel.findOne as jest.Mock).mockRejectedValue(new Error());

    const response = await request(app).post("/api/auth").send({
      email: "",
      senha: "password",
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});

// describe("AuthController - recoverCode", () => {
//   it("200 - Código enviado com sucesso", async () => {
//     (UserModel.findOne as jest.Mock).mockResolvedValue({
//       _id: "123",
//       nomeCompleto: "Test",
//       email: "test@gm.com",
//     });
//     (bcrypt.hash as jest.Mock).mockResolvedValue("fake_hash");
//     (RecoverCodeModel.prototype.save as jest.Mock).mockResolvedValue(null);
//     (sendEmail as jest.Mock).mockResolvedValue(null);

//     const response = await request(app)
//       .post("/api/auth/recover")
//       .send({ email: "test@gm.com" });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("userID");
//   });

//   it("404 - Usuário não encontrado", async () => {
//     (UserModel.findOne as jest.Mock).mockResolvedValue(null);

//     const response = await request(app)
//       .post("/api/auth/recover")
//       .send({ email: "test@gg.com" });

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toHaveProperty("error");
//   });

//   it("500 - Erro ao enviar o email", async () => {
//     (UserModel.findOne as jest.Mock).mockResolvedValue({
//       _id: "123",
//       nomeCompleto: "Test",
//     });
//     (bcrypt.hash as jest.Mock).mockResolvedValue("fake_hash");
//     (RecoverCodeModel.prototype.save as jest.Mock).mockRejectedValue(new Error());
//     (sendEmail as jest.Mock).mockResolvedValue(null);

//     const response = await request(app)
//       .post("/api/auth/recover")
//       .send({ email: "test@gg.com" });

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("error");
//   });

//   it("500 - Erro ao enviar código de recuperação", async () => {
//     (UserModel.findOne as jest.Mock).mockImplementation(() => {
//       return {
//         exec: () => Promise.reject(new Error())
//       };
//     });

//     const response = await request(app)
//       .post("/api/auth/recover")
//       .send({ email: "test@gg.com" });

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("error");
//   });
// });

describe("AuthController - verifyJWT", () => {
  it("200 - Token válido", async () => {
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, { userID: "123" });
    });

    const response = await request(app)
      .post("/api/auth/verifyjwt")
      .set("Authorization", "Bearer fake_token");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("jwt", true);
  });

  it("401 - Token não encontrado", async () => {
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error());
    });

    const response = await request(app)
      .post("/api/auth/verifyjwt")

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error", "Token não encontrado");
  });

  it("401 - Token inválido", async () => {
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error("Token inválido"), null);
  });

    const response = await request(app)
      .post("/api/auth/verifyjwt")
      .set("Authorization", "Bearer f1132");

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error", "Token inválido!");
  });

  it("500 - Erro ao verificar o token", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    const response = await request(app)
      .post("/api/auth/verifyjwt")
      .set("Authorization", "Bearer faksa");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});
