const UserService = require("../services/UserService");
const { generateToken } = require("../utils/Token");

class UserController {

    constructor() {
        this.userService = new UserService();
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.login = this.login.bind(this);
    }

    // Método para criar um novo usuário
    /*
     POST /users/
     body?
        {
            "user": {
                "name": "Nome do Usuário",
                "email": "  Email do Usuário",
                "password": "Senha do Usuário"
            }
        }
    */
    create = async (req, res) => {
        try {
            const { user: userData } = req.body;

            if (!userData || !userData.name || !userData.email || !userData.password) {
                return res.status(400).json({
                    message: "Dados inválidos." +
                        "Esperado um objeto 'user' com os parametros 'name', 'email' e 'password'."
                });
            }

            const existingUser = await UserService.getByEmail(userData.email);

            if (existingUser) {
                return res.status(400).json({
                    message: "Dados inválidos." +
                        "Já existe um usuário cadastrado com o email informado."
                });
            }

            const user = await UserService.create(userData);

            if (!user) {
                return res.status(500).json({ message: "Erro ao criar usuário." });
            }

            return res.status(201).json({
                message: "Usuário criado com sucesso.",
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error("CONTROLLER ERROR", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Método para buscar um usuário pelo id
    /*
        GET /users/:id
    */
    getById = async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: "Dados inválidos." +
                        "Esperado um parametro 'id' do usuário."
                });
            }

            const user = await UserService.getById(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            return res.status(200).json({
                message: "Usuário encontrado.",
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error("CONTROLLER ERROR", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Método para buscar um usuário pelo email
    /*
        GET /users/email/:email
    */
    getByEmail = async (req, res) => {
        try {
            const { email } = req.params;

            if (!email) {
                return res.status(400).json({
                    message: "Dados inválidos." +
                        "Esperado um parametro 'email' do usuário."
                });
            }

            const user = await UserService.getByEmail(email);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            return res.status(200).json({
                message: "Usuário encontrado.",
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error("CONTROLLER ERROR", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Método para buscar todos os usuários
    /*
        GET /users/
    */
    getAll = async (req, res) => {
        try {
            const users = await UserService.getAll();

            return res.status(200).json({
                message: "Usuários encontrados.",
                users: users.map(user => ({
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                }))
            });

        } catch (error) {
            console.error("CONTROLLER ERROR", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Método para atualizar um usuário
    /*
        PUT /users/:id
        body?
        {
            "user": {
                "name": "Nome do Usuário",
                "email": "Email do Usuário",
                "password": "Senha do Usuário"
            }
        }
    */
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const { user: userData } = req.body;

            if (!id || !userData || !userData.name && !userData.email && !userData.password) {
                return res.status(400).json({
                    message: "Dados inválidos." +
                        "Esperado um parametro 'id' do usuário e um objeto 'userData' com os parametros 'name', 'email' e 'password'."
                });
            }

            if (userData.email) {
                const existingUser = await UserService.getByEmail(userData.email);

                if (existingUser && existingUser.user_id !== id) {
                    return res.status(400).json({
                        message: "Dados inválidos." +
                            "Já existe um usuário cadastrado com o email informado."
                    });
                }
            }

            const user = await UserService.update(id, userData);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            return res.status(200).json({
                message: "Usuário atualizado com sucesso.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error("CONTROLLER ERROR", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Método para remover um usuário
    /*
        DELETE /users/:id
    */

    remove = async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: "Dados inválidos." +
                        "Esperado um parametro 'id' do usuário."
                });
            }

            const user = await UserService.remove(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            return res.status(200).json({
                message: "Usuário removido com sucesso.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error("CONTROLLER ERROR", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Método para realizar o login de um usuário
    /*
        POST /users/login
        body?
        {
            "email": "Email do Usuário",
            "password": "Senha do Usuário"
        }
    */
    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Dados inválidos." +
                        "Esperado um objeto com os parametros 'email' e 'password'."
                });
            }

            const user = await UserService.getByEmail(email);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            if (user.password !== password) {
                return res.status(401).json({ message: "Dados inválidos." });
            }

            const token = generateToken({ user_id: user.user_id, email: user.email });

            return res.status(200).json({
                message: "Usuário logado com sucesso.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token
            });

        } catch (error) {
            console.error("CONTROLLER ERROR", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

module.exports = UserController;