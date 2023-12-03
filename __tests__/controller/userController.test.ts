import request from "supertest"
import jwt from 'jsonwebtoken';;
import app from "../../src/app";
import UserModel from "../../src/models/userModel";
require('dotenv').config();
let server: any;

beforeAll(() => {
  server = app.listen();
});

afterAll((done) => {
  server.close(done);
});

jest.mock("../../src/models/userModel")

describe("UserController - getUserById", () => {
  it("200 - User encontrado", async () => {
    (UserModel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: "123",
        nome: "Teste",
        email: "test@test.com",
        senha: "123456",
      }),
    });
    const response = await request(app).get("/api/user/id/123");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
  });

  it("404 - User não encontrado", async () => {
    (UserModel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });
  
    const response = await request(app).get("/api/user/id/123");
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
  
  it("500 - Erro ao buscar o usuário", async () => {
    (UserModel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error()),
    });
  
    const response = await request(app).get("/api/user/id/123");
  
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});

describe("UserController - getUserByEmail", () => {
  it("200 - User encontrado", async () => {
    (UserModel.findOne as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: "123",
        nome: "Teste",
        email: "test@test.com",
        senha: "123456",
      }),
    });

    const response = await request(app).get("/api/user/email/test@test.com");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
  });

  it("404 - User não encontrado", async () => {
    (UserModel.findOne as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });
  
    const response = await request(app).get("/api/user/email/test@test.com");
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
  
  it("500 - Erro ao buscar o usuário", async () => {
    (UserModel.findOne as jest.Mock).mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error()),
    });
  
    const response = await request(app).get("/api/user/email/test@test.com");
  
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});

describe("UserController - getAllUsers", () => {
  it("200 - Users encontrados", async () => {
    const users = [
      {
        _id: "123",
        nome: "Teste",
        email: "test@test.com",
        senha: "123456",
      },
      {
        _id: "456",
        nome: "Teste 2",
        email: "test2@test.com",
        senha: "123456",
      },
    ];
    (UserModel.find as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(users),
    });

    const response = await request(app).get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("500 - Error ao encontrar users", async () => {
    (UserModel.find as jest.Mock).mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error()),
    });

    const response = await request(app).get("/api/user");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});

describe("UserController - createUser", () => {
  // it("201 - User criado", async () => {
  //   jest.doMock('../../src/models/userModel', () => {
  //     return {
  //       __esModule: true,
  //       default: jest.fn().mockImplementation(() => {
  //         return {
  //           save: jest.fn().mockResolvedValue({ _id: '123' }),
  //           toObject: jest.fn().mockReturnValue({ _id: '123' }),
  //         };
  //       }),
  //     };
  //   });

  //   const user = {
  //     nomeCompleto: "Nome do Usuário",
  //     cpf: "3123233212",
  //     telefone: "535-555-5555",
  //     email: "usuario21@teste.com",
  //     senha: "senhasecreta",
  //     endereco: "Rua da Amostra, 123",
  //     tipo: "Prestador",
  //   };
  
  //   const response = await request(app)
  //     .post("/api/user")
  //     .send(user);
  
  //   expect(response.statusCode).toBe(201);
  //   expect(response.body).toHaveProperty("_id");
  //   expect(response.body).toHaveProperty("nomeCompleto", user.nomeCompleto);
  //   expect(response.body).toHaveProperty("cpf", user.cpf);
  //   expect(response.body).not.toHaveProperty("senha");
  // });
  

  it("400 - User já existe", async () => {
    const user = {
      nomeCompleto: "Nome do Usuário",
      cpf: "3123213212",
      telefone: "555-555-5555",
      email: "usuario1@teste.com",
      senha: "senhasecreta",
      endereco: "Rua da Amostra, 123",
      tipo: "Prestador"
    };
    const newUser = {
      save: jest.fn().mockRejectedValue({ code: 11000 }),
    };
    jest.spyOn(UserModel.prototype, 'save').mockImplementation(() => Promise.reject({ code: 11000 }));
  
    const response = await request(app)
      .post("/api/user")
      .send(user);
  
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("500 - Erro ao criar user", async () => {
    const user = {
      nomeCompleto: "Nome do Usuário",
      cpf: "3123213212",
      telefone: "555-555-5555",
      email: "usuario1@teste.com",
      senha: "senhasecreta",
      endereco: "Rua da Amostra, 123",
      tipo: "Prestador"
    };
    jest.spyOn(UserModel.prototype, 'save').mockImplementation(() => Promise.reject(new Error()));
  
    const response = await request(app)
      .post("/api/user")
      .send(user);
  
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});

describe("UserController - updateUser", () => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET não está definido.');
  }
  const token = jwt.sign({ userId: '123' }, jwtSecret, { expiresIn: '1h' });

  it("200 - User atualizado", async () => {
    const user = {
      nomeCompleto: "Nome do Usuário",
      cpf: "3123213212",
      telefone: "555-555-5555",
      email: "usuario1@teste.com",
      senha: "senhasecreta",
      endereco: "Rua da Amostra, 123",
      tipo: "Prestador"
    };

    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(user);

    const response = await request(app)
      .put("/api/user/123")
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(user);
  });

  it("404 - User não encontrado", async () => {
    const user = {
      nomeCompleto: "Nome do Usuário",
      cpf: "3123213212",
      telefone: "555-555-5555",
      email: "usuario1@teste.com",
      senha: "senhasecreta",
      endereco: "Rua da Amostra, 123",
      tipo: "Prestador"
    };

    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .put("/api/user/123")
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "Usuário não encontrado!");
  });

  it("500 - Erro ao atualizar user", async () => {
    const user = {
      nomeCompleto: "Nome do Usuário",
      cpf: "3123213212",
      telefone: "555-555-5555",
      email: "usuario1@teste.com",
      senha: "senhasecreta",
      endereco: "Rua da Amostra, 123",
      tipo: "Prestador"
    };

    (UserModel.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error());

    const response = await request(app)
      .put("/api/user/123")
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error", "Erro ao atualizar o usuário");
  });
});